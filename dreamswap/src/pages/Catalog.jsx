import { Container, Row, Col } from "react-bootstrap";
import { dreams } from "../utils/mockDreams.js";
import DreamCard from "../components/DreamCard.jsx";

export default function Catalog() {
  return (
    <Container className="py-4">
      <h1 className="h3 mb-4">Catálogo</h1>
      <Row className="g-3">
        {dreams.map((d) => (
          <Col md={6} xl={4} key={d.id}>
            <DreamCard dream={d} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}