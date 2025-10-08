import { useState } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Cart(){
  const { cart, removeFromCart, total, checkout } = useCart();
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [metodo, setMetodo] = useState('Créditos REM');
  const [msg, setMsg] = useState('');

  const onCheckout = (e) => {
    e.preventDefault();
    if(!fecha || !hora) return setMsg('Selecciona fecha y hora');
    const id = checkout({ fecha, hora, metodo });
    if (id) navigate(`/tracking?id=${id}`);
  };

  if(!cart.length) return <Alert variant="secondary">Tu carrito está vacío</Alert>;

  return (
    <>
      <h1 className="h3 mb-3">Tu Carrito</h1>

      <Table responsive bordered variant="dark">
        <thead>
          <tr>
            <th>Sueño</th><th>Duración</th><th>Intensidad</th><th>Extras</th><th>Subtotal</th><th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((it, i) => (
            <tr key={i}>
              <td>{it.nombre}</td>
              <td>{it.duracion} min</td>
              <td>{it.intensidad}</td>
              <td>{it.extras?.join(', ') || '—'}</td>
              <td>{it.subtotal} CR</td>
              <td><Button size="sm" variant="outline-light" onClick={()=>removeFromCart(i)}>Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan={4} className="fw-bold">Total</td><td className="fw-bold">{total} CR</td><td></td></tr>
        </tfoot>
      </Table>

      <h2 className="h5 mt-4">Programar y Confirmar</h2>
      {msg && <Alert variant="warning" onClose={()=>setMsg('')} dismissible>{msg}</Alert>}
      <Form className="row g-3" onSubmit={onCheckout}>
        <Form.Group className="col-md-4">
          <Form.Label>Fecha</Form.Label>
          <Form.Control type="date" value={fecha} onChange={e=>setFecha(e.target.value)} />
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label>Hora</Form.Label>
          <Form.Control type="time" value={hora} onChange={e=>setHora(e.target.value)} />
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label>Método</Form.Label>
          <Form.Select value={metodo} onChange={e=>setMetodo(e.target.value)}>
            <option>Créditos REM</option><option>Tarjeta</option>
          </Form.Select>
        </Form.Group>
        <div className="col-12 d-grid d-sm-block">
          <Button type="submit" variant="light">Confirmar pedido</Button>
        </div>
      </Form>
    </>
  );
}
