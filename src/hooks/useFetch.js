import { useState, useEffect } from "react";
import { getCollection } from "../data/localDb";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resource = url.split("/").pop();
    const result = getCollection(resource);
    setData(result);
    setLoading(false);
  }, [url]);

  return { data, loading };
}

export default useFetch;