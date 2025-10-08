import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1 mb-4">404</h1>
      <p className="lead mb-4">¡Ups! Parece que te has perdido en el mundo de los sueños.</p>
      <Button as={Link} to="/" variant="light">Volver al inicio</Button>
    </Container>
  );
}