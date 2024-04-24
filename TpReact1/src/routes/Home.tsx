import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to={"/productos"}>
        <button>Ir a listado de instrumentos</button>
      </Link>
    </>
  );
};
