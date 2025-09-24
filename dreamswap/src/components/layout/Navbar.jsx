import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="border-bottom" aria-label="Main">
        <Container>
            <Navbar.Brand as={Link} to="/">🌙 DreamSwap</Navbar.Brand>
            <Navbar.Toggle aria-controls="mainNav" />
            <Navbar.Collapse id="mainNav">
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/catalog">Catálogo</Nav.Link>
                <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
                <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/reviews">Reseñas</Nav.Link>
                <Nav.Link as={Link} to="/blog">Guía & Ciencia</Nav.Link>
                <Nav.Link as={Link} to="/loyalty">Créditos REM</Nav.Link>
                <Nav.Link as={Link} to="/tracking">Tracking</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}