import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("data fetching error")
        }
        const fetchedData = await response.json()
        setData(fetchedData)

      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }

    }

    fetchData()
  }, [url]);

  return { data, error, loading };
}
