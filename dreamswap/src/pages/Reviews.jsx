import { useState } from 'react';
import { Card, Row, Col, Form, Container } from 'react-bootstrap';
import { reviews } from '../utils/mockReviews.js';

export default function Reviews() {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredReviews = reviews.filter(review =>
    review.title.toLowerCase().includes(filter.toLowerCase()) ||
    review.content.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4">Reseñas de la Comunidad</h1>
      
      <Row className="g-4 mb-4">
        <Col md={8}>
          <Form.Control
            type="search"
            placeholder="Buscar reseñas..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">Más recientes</option>
            <option value="rating">Mejor valorados</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-4">
        {sortedReviews.map(review => (
          <Col key={review.id} md={6}>
            <Card className="h-100 bg-dark border-secondary">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Card.Title className="text-light">{review.title}</Card.Title>
                    <Card.Subtitle className="text-secondary">
                      por {review.userName} • {new Date(review.date).toLocaleDateString()}
                    </Card.Subtitle>
                  </div>
                  <span className="text-warning">{'★'.repeat(review.rating)}</span>
                </div>
                <Card.Text className="text-light">{review.content}</Card.Text>
                {review.verified && (
                  <div className="mt-2">
                    <small className="text-success">✓ Compra verificada</small>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}