import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken")

  const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
  useEffect(() => {
    async function fetchData() {
      try {
        // added for the purpose of the project
        const response = await fetch(url, {
          method: "GET",

          headers,
        });

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
