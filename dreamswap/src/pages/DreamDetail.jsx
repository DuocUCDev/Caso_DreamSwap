import { useParams, useNavigate } from 'react-router-dom';
import { dreams } from '../utils/mockDreams.js';
import { useMemo, useState } from 'react';
import { calcPriceCR } from '../utils/pricing.js';
import { Form, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.jsx';

export default function DreamDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const dream = useMemo(()=> dreams.find(d => d.id === id), [id]);
  const [duration, setDuration] = useState(dream?.duration ?? 30);
  const [intensity, setIntensity] = useState(dream?.intensity ?? 'Media');
  const [extras, setExtras] = useState([]);
  const subtotal = calcPriceCR({ duration, extras });

  if(!dream) return <p>🛌 Sueño no encontrado.</p>;

  const handleAdd = () => {
    addToCart({ id: dream.id, nombre: dream.title, duracion: duration, intensidad: intensity, extras, subtotal });
    navigate('/cart');
  };

  return (
    <>
      <h1 className="h3 mb-2">{dream.title}</h1>
      <p className="text-secondary small mb-4">
        Base: {dream.duration} min • Intensidad: {dream.intensity} • Rareza: {'★'.repeat(dream.rarity)}
      </p>

      <Form className="vstack gap-3">
        <Form.Group>
          <Form.Label>Duración (min)</Form.Label>
          <Form.Control type="number" min={15} step={5} value={duration} onChange={e=>setDuration(+e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Intensidad</Form.Label>
          <Form.Select value={intensity} onChange={e=>setIntensity(e.target.value)}>
            <option>Suave</option><option>Media</option><option>Alta</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Extras</Form.Label>
          <Form.Select multiple value={extras} onChange={e=>setExtras(Array.from(e.target.selectedOptions).map(o=>o.value))}>
            <option value="8d">Audio 8D</option>
            <option value="lucid">Control lúcido</option>
            <option value="cameos">Cameos sorpresa</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex align-items-center gap-3">
          <strong>Precio: {subtotal} CR</strong>
          <Button variant="light" onClick={handleAdd}>Agregar al carrito</Button>
        </div>
      </Form>
    </>
  );
}
