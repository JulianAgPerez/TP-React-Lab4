import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Col, Row } from "react-bootstrap";

interface Props {
  imagen: string;
}

export const ContenedorImage = ({ imagen }: Props) => {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={`../../img/${imagen}`} rounded />
        </Col>
      </Row>
    </Container>
  );
};
