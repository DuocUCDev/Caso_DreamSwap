import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DreamCard({ dream }) {
    return (
        <Card className="bg-dark border-secondary h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title>{dream.title}</Card.Title>
                <Card.Subtitle className="text-secondary small mb-2">
                    Duración: {dream.duration} min • Intensidad: {dream.intensity} • Rareza: {'★'.repeat(dream.rarity)}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">{dream.summary}</Card.Text>
                <div className="d-flex gap-2">
                    <Button as={Link} to={`/dreams/${dream.id}`} variant="outline-light" size='sm'>Ver detalle</Button>
                    <Button as={Link} to="/cart" variant='light' size='sm'>Agregar</Button>
                </div>
            </Card.Body>
        </Card>
    );
}