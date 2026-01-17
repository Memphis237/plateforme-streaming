import React, {useState, useEffect} from "react";
export default function useDetailsFilms(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() =>{
    if(!url) return; // ne rien faire si url n'existe pas

    async function fetchDetailsFilms() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`erreur: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    }

    fetchDetailsFilms();
}, [url]);


return {data, loading, error};

}