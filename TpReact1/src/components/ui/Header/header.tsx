import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useAppDispatch } from "../../../redux/HookReducer";
import { setLogout } from "../../../redux/slices/AuthSlice";

export const HeaderHome = () => {
  const dispatch = useAppDispatch();
  const rolFromState = useSelector((state: RootState) => state.auth?.rol);
  const [rol, setRol] = useState<string | null>(rolFromState);

  const handleLogout = () => {
    dispatch(setLogout());
    setRol(null); // Actualiza el estado local para reflejar el logout
  };

  useEffect(() => {
    setRol(rolFromState); // Sincroniza el estado local con el estado de Redux
  }, [rolFromState]);

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
          <Navbar.Collapse className="justify-content-end gap-2">
            <Navbar.Text>Ingresado como : {rol || "visitante"}</Navbar.Text>
            <Nav.Item>
              {rol ? (
                <div
                  className="d-flex justify-content--center align-items-center"
                  onClick={handleLogout}
                >
                  <span
                    style={{ color: "#fff", cursor: "pointer" }}
                    className="material-symbols-outlined"
                  >
                    logout
                  </span>
                </div>
              ) : (
                <>
                  <a href="/register" className="nav-link">
                    Registrarse
                  </a>
                  <a href="/login" className="nav-link">
                    Iniciar sesión
                  </a>
                </>
              )}
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
