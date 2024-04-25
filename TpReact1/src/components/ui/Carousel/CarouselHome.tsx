import { Carousel as CarouselComponent } from "react-bootstrap";
import "./CarouselHome.css";
function Carousel() {
  return (
    <CarouselComponent fade>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1211359508/es/vector/iconos-de-instrumentos-musicales-de-jazz.jpg?s=1024x1024&w=is&k=20&c=v8dW7z0b6tWuYB5GijmgVkyqp-NQ298DMG-eVJAjvDM="
        />
      </CarouselComponent.Item>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100 "
          src="https://www.shutterstock.com/shutterstock/photos/1689595600/display_1500/stock-vector-drum-in-set-in-wpap-pop-art-style-for-music-activity-background-icon-or-image-isolated-1689595600.jpg"
        />
      </CarouselComponent.Item>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100"
          src="https://t4.ftcdn.net/jpg/07/08/96/35/360_F_708963510_vHNCp4QhsFEQ6V8OKQE4ct7k3VqgLKes.jpg"
        />
      </CarouselComponent.Item>
    </CarouselComponent>
  );
}

export default Carousel;
