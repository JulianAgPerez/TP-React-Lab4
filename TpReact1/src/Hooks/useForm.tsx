import { ChangeEvent, useState } from "react";

// Interfaz genérica para useForm que define la forma de los valores del formulario
interface FormValues {
  [key: string]: string | number;
}

export const useForm = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [`${name}`]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};
