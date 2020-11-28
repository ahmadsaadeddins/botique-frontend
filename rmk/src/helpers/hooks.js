import { useState, useEffect } from "react";
import axios from "axios";
import { authenticationService, authAxios } from "../services";

function useFetch(url, initialState = null) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let ax = axios;
        if (authenticationService.isAuthenticated) {
          ax = authAxios;
        }
        const res = await ax.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchPosts();
  }, [url]);

  return {
    data: data,
    loading: loading,
    error: error,
  };
}

export { useFetch };
