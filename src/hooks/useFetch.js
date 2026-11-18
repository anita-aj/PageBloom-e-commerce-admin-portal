import { useState, useEffect } from "react"; 

function useFetch(url) { 
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => { // run when the page opens or the url changes
    fetch(url) 
      .then((res) => res.json()) // turn the API reply into usable data
      .then((result) => { // when the data arrives
        setData(result); // save the data
        setLoading(false); //say we are done waiting
      });
  }, [url]); // run again only if the url changes

  return { data, loading }; // hand both back to whoever used the hook
}
export default useFetch;