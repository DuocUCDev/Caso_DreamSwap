
import { Card, Row, Col, ProgressBar, Button, Container, Table } from 'react-bootstrap';
import { useProfile } from '../contexts/ProfileContext.jsx';

export default function Loyalty() {
  const { profile } = useProfile();
  
  // Datos simulados de programa de lealtad
  const loyaltyData = {
    credits: 750,
    level: 'Soñador Plata',
    nextLevel: 'Soñador Oro',
    progress: 75,
    history: [
      { date: '2025-10-01', description: 'Compra de sueño "Explorador de ciudades perdidas"', credits: +120 },
      { date: '2025-09-28', description: 'Bono por reseña verificada', credits: +50 },
      { date: '2025-09-25', description: 'Compra de sueño "Aventura en el espacio"', credits: +150 },
      { date: '2025-09-20', description: 'Bono de referido', credits: +100 }
    ]
  };

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4">Programa de Lealtad</h1>
      
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="bg-dark border-secondary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h2 className="h4 mb-1">¡Hola, {profile.nombre || 'Soñador'}!</h2>
                  <p className="text-secondary mb-0">Nivel actual: {loyaltyData.level}</p>
                </div>
                <div className="text-end">
                  <h3 className="h4 mb-1">{loyaltyData.credits} CR</h3>
                  <p className="text-secondary mb-0">Créditos REM</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <small>Progreso hacia {loyaltyData.nextLevel}</small>
                  <small>{loyaltyData.progress}%</small>
                </div>
                <ProgressBar now={loyaltyData.progress} variant="primary" />
              </div>

              <div className="d-flex gap-2">
                <Button variant="outline-light">Canjear créditos</Button>
                <Button variant="light">Subir de nivel</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="bg-dark border-secondary">
            <Card.Body>
              <h3 className="h5 mb-3">Beneficios actuales</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">✓ 10% extra en créditos por compra</li>
                <li className="mb-2">✓ Acceso prioritario a nuevos sueños</li>
                <li className="mb-2">✓ Soporte premium 24/7</li>
                <li>✓ 1 sueño gratuito al mes</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="bg-dark border-secondary">
        <Card.Body>
          <h3 className="h5 mb-3">Historial de Créditos</h3>
          <Table responsive variant="dark" className="mb-0">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th className="text-end">Créditos</th>
              </tr>
            </thead>
            <tbody>
              {loyaltyData.history.map((item, i) => (
                <tr key={i}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.description}</td>
                  <td className="text-end">
                    <span className={item.credits > 0 ? 'text-success' : 'text-danger'}>
                      {item.credits > 0 ? '+' : ''}{item.credits}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}