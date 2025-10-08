import { useState } from 'react';
import { Card, Row, Col, Form, Badge, Container } from 'react-bootstrap';
import { articles } from '../utils/mockArticles.js';

export default function Blog() {
  const [category, setCategory] = useState('');
  const categories = [...new Set(articles.map(a => a.category))];

  const filteredArticles = category 
    ? articles.filter(a => a.category === category)
    : articles;

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4">Guía & Ciencia</h1>
      
      <div className="mb-4">
        <Form.Select 
          value={category} 
          onChange={e => setCategory(e.target.value)}
          className="w-auto"
        >
          <option value="">Todas las categorías</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </div>

      <Row className="g-4">
        {filteredArticles.map(article => (
          <Col key={article.id} md={6} lg={4}>
            <Card className="h-100 bg-dark border-secondary">
              <Card.Body>
                <Badge bg="primary" className="mb-2">{article.category}</Badge>
                <Card.Title className="h4">{article.title}</Card.Title>
                <Card.Text className="text-secondary small mb-3">
                  por {article.author} • {new Date(article.date).toLocaleDateString()}
                </Card.Text>
                <Card.Text className="text-light">
                  {article.excerpt}
                </Card.Text>
                <button className="btn btn-link p-0">Leer más →</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}