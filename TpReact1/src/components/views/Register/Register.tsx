import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Register.module.css";
import { useForm } from "../../../Hooks/useForm";
import { setLogin } from "../../../redux/slices/AuthSlice";
import { useAppDispatch } from "../../../redux/HookReducer";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { values, handleChange } = useForm({
    user: "",
    password: "",
    rol: "",
  });
  const { user, password, rol } = values;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreUsuario: user, clave: password, rol }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario. Vuelva a intentar.");
      }

      const data = await response.json();
      dispatch(
        setLogin({
          user: data.nombreUsuario,
          password: password,
          rol: data.rol,
        })
      );
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <span
          style={{ fontSize: "10vh" }}
          className="material-symbols-outlined"
        >
          account_circle
        </span>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={user}
              name="user"
              type="text"
              placeholder="Usuario"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={password}
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={rol}
              name="rol"
            >
              <option value="Admin">Admin</option>
              <option value="Operador">Operador</option>
              <option value="Visor">Visor</option>
            </Form.Control>
          </Form.Group>
          <Form.Check
            type="switch"
            onChange={() => setShowPass(!showPass)}
            id="custom-switch"
            label="Mostrar contraseña"
          />
          <div className="d-flex justify-content-center align-items-center mt-2">
            <Button type="submit" variant="primary">
              Registrarse
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
