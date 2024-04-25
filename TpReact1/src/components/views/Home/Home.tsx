import { Link } from "react-router-dom";
import CarouselHome from "../../ui/Carousel/CarouselHome";
import "./Home.css";
import { HeaderHome } from "../../ui/Header/header";

export const Home = () => {
  return (
    <>
      <h1 id="title">Musical Hendrix</h1>
      <CarouselHome />
      <div id="cuerpo">
        Musical Hendrix es una tienda de instrumentos musicales con ya más de 15
        años de experiencia. Tenemos el conocimiento y la capacidad como para
        informarte acerca de las mejores elecciones para tu compra musical.
      </div>
      <Link
        to={"/productos"}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <button id="button">Ir a listado de instrumentos</button>
      </Link>
    </>
  );
};
