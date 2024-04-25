import { Link } from "react-router-dom";
import CarouselHome from "../../ui/Carousel/CarouselHome";
import "./Home.css";
import { DondeEstamos } from "../DondeEstamos/DondeEstamos";

export const Home = () => {
  return (
    <>
      <section id="inicio">
        <h1 id="title">Musical Hendrix</h1>
        <CarouselHome />
        <div id="cuerpo">
          Musical Hendrix es una tienda de instrumentos musicales con ya más de
          15 años de experiencia. Tenemos el conocimiento y la capacidad como
          para informarte acerca de las mejores elecciones para tu compra
          musical.
        </div>
      </section>
      <DondeEstamos />
    </>
  );
};
