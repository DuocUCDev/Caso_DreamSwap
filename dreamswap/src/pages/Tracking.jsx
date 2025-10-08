import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, ListGroup, Alert } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.jsx';

const STEPS = ['Preparando tu sueño','Sincronizando con tu ciclo REM','Listo para iniciar'];

export default function Tracking(){
  const { orders } = useCart();
  const q = new URLSearchParams(useLocation().search);
  const [id, setId] = useState(q.get('id') || '');

  const order = useMemo(()=> orders.find(o => o.id === id), [orders, id]);

  useEffect(()=>{ const urlId = q.get('id'); if(urlId) setId(urlId); }, []); // precargar desde /tracking?id=...

  return (
    <>
      <h1 className="h3 mb-3">Estado de tu experiencia</h1>
      <Form className="row g-2 mb-3" onSubmit={e=>e.preventDefault()}>
        <Form.Group className="col-md-6">
          <Form.Label>Order ID</Form.Label>
          <Form.Control value={id} onChange={e=>setId(e.target.value)} placeholder="DS-..." />
        </Form.Group>
      </Form>

      {!id ? <Alert variant="secondary">Ingresa un Order ID</Alert> :
        order ? (
          <ListGroup>
            {STEPS.map((s, i) => (
              <ListGroup.Item key={i} className="bg-transparent text-white border-secondary">{s}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : <Alert variant="warning">Pedido no encontrado</Alert>
      }
    </>
  );
}
