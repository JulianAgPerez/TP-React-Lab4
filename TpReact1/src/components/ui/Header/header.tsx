import { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HeaderHome = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleAnchorClick = (e: any) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Navbar
        style={{
          backgroundImage: "linear-gradient(to right, #edde9c, #977e10)",
        }}
        sticky="top"
        variant="tabs"
      >
        <Container>
          <Navbar.Brand>
            <a href="/#inicio" className="nav-link" onClick={handleAnchorClick}>
              Inicio
            </a>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item>
              <Link to={"/productos"} className="nav-link">
                Productos
              </Link>
            </Nav.Item>
            <Nav.Item className="me-auto">
              <a
                href="/#nosotros"
                className="nav-link"
                onClick={handleAnchorClick}
              >
                Donde estamos
              </a>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
