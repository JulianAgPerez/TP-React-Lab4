import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HeaderHome = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className="nav-link">
              Inicio
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item>
              <Link to={"/productos"} className="nav-link">
                Productos
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/nosotros"} className="nav-link">
                Quienes somos
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
