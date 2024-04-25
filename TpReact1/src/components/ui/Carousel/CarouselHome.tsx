import { Carousel as CarouselComponent } from "react-bootstrap";
import "./CarouselHome.css";
function Carousel() {
  return (
    <CarouselComponent fade>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpD6UrJusar4uBYVYIXhOH35gDPR8Wz9scwTJgZP3DEQ&s"
        />
      </CarouselComponent.Item>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJB6eJUs9jfYz2mLWFIojrakNFXyPgVkqZpu1wA9n1EQ&s"
        />
      </CarouselComponent.Item>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/894058154/es/foto/instrumentos-musical.jpg?s=612x612&w=0&k=20&c=WjTwmZPcFkGuAU7DAjpToSMe5baR8XJvHkyg3jMxkWg="
        />
      </CarouselComponent.Item>
    </CarouselComponent>
  );
}

export default Carousel;
