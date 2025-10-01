import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="py-5">
      <Row className="align-items-center g-4">
        <Col lg={7}>
          <h1 className="display-5 fw-bold">
            Convierte tus noches en experiencias memorables
          </h1>
          <p className="lead text-secondary">
            Explora, personaliza y programa tu próximo sueño.
          </p>
          <Form className="d-flex gap-2 mt-3">
            <Form.Control
              type="search"
              placeholder="Aventura, romance, misterio…"
            />
            <Button variant="light">Buscar</Button>
          </Form>
        </Col>

        <Col lg={5}>
          <Card className="bg-dark border-secondary p-3">
            <Card.Title>🌟 Destacados de hoy</Card.Title>
            <ul className="mb-0 small text-secondary">
              <li>Safari en nubes ☁️</li>
              <li>Concierto con tu banda favorita 🎶</li>
              <li>Tiempo con un ser querido ❤️</li>
            </ul>
            <Button as={Link} to="/catalog" className="mt-3" variant="light">
              Ver catálogo
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}