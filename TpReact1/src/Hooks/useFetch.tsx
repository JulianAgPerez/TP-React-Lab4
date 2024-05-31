import { useEffect, useState } from "react";
const base = "http://localhost:8080";
export function useFetch(url: RequestInfo | URL) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); //Agregar en un {loading && <li>Loading...</li>} o <Suspense fallback={<div>Loading...</div>}>
  const [controller, setController] = useState<AbortController | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController(); //Evita que se haga la request al sv en caso de cerrar la pagina, etc
    setController(abortController);
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(base + url, { signal });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error);
          }
        } else {
          setError(new Error("Ha ocurrido un error desconocido"));
        }
      } finally {
        setLoading(false);
      }
      return () => abortController.abort();
    };
    fetchData();
  }, [url]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      console.error("Request cancelada");
    }
  };

  return { data, loading, error, handleCancelRequest };
}

/*
//Con Promise Chaining
useEffect(() => {
  setLoading(true);
  fetch(url)
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
});

return { data, loading, error };
*/
