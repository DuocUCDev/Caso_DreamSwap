import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { dreams } from "../utils/mockDreams.js";
import DreamCard from "../components/DreamCard.jsx";
import DreamFilters from "../components/DreamFilters.jsx";

export default function Catalog() {
  const [filteredDreams, setFilteredDreams] = useState(dreams);

  const handleFilterChange = (filters) => {
    let result = [...dreams];

    // Filtrar por categorías
    if (filters.categories.size > 0) {
      result = result.filter(dream => 
        dream.categories.some(category => filters.categories.has(category))
      );
    }

    // Filtrar por duración
    if (filters.duration) {
      result = result.filter(dream => 
        dream.duration <= parseInt(filters.duration)
      );
    }

    // Filtrar por intensidad
    if (filters.intensity) {
      result = result.filter(dream => 
        dream.intensity === filters.intensity
      );
    }

    setFilteredDreams(result);
  };

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4">Catálogo</h1>
      <Row>
        <Col lg={3} className="mb-4">
          <DreamFilters onFilterChange={handleFilterChange} />
        </Col>
        <Col lg={9}>
          <Row className="g-3">
            {filteredDreams.map((dream) => (
              <Col md={6} xl={4} key={dream.id}>
                <DreamCard dream={dream} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}