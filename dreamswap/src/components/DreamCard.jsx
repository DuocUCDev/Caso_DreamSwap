import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { calcPriceCR } from '../utils/pricing';

export default function DreamCard({ dream }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const item = {
            id: dream.id,
            nombre: dream.title,
            duracion: dream.duration,
            intensidad: dream.intensity,
            extras: [],
            subtotal: calcPriceCR({ duration: dream.duration })
        };
        addToCart(item);
        navigate('/cart');
    };

    return (
        <Card className="bg-dark border-secondary h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-4 fw-bold mb-2 text-light">{dream.title}</Card.Title>
                <Card.Subtitle className="text-secondary small mb-3">
                    Duración: {dream.duration} min • Intensidad: {dream.intensity} • 
                    Rareza: {Array(dream.rarity).fill('★').join('')}{'☆'.repeat(3 - dream.rarity)}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1 text-light">{dream.summary}</Card.Text>
                <div className="d-flex gap-2">
                    <Button 
                        as={Link} 
                        to={`/dream/${dream.id}`} 
                        variant="outline-light"
                        className="flex-grow-1"
                    >
                        Ver detalle
                    </Button>
                    <Button 
                        onClick={handleAddToCart}
                        className="gradient-button flex-grow-1"
                    >
                        Agregar
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}