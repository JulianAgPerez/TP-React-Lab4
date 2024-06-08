import { useEffect, useState } from "react";

const base = "http://localhost:8080";

export function useFetch(
  url: RequestInfo | URL,
  params: Record<string, any> = {}
) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [controller, setController] = useState<AbortController | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    const signal = abortController.signal;

    // Construct URL with query parameters
    const queryParams = new URLSearchParams(params).toString();
    const fetchUrl = `${base}${url}?${queryParams}`;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(fetchUrl, { signal });
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
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url, params]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      console.error("Request canceled");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
