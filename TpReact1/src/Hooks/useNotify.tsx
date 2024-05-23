import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotify = () => {
  const notify = (msj: string) => {
    return toast.success(`${msj} con éxito!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return notify;
};

export default useNotify;
