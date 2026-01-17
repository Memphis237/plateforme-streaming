import React, {useEffect, useState} from "react"
export function useFetch(url){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true );
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() =>{
        if(url){
            async function fetchData(){
                setLoading(true);
                setError(null);
                try{
                    const base_url = `${url}&page=${pages}`;
                    const response = await fetch(base_url);
                    if(!response.ok){
                        throw new Error(`erreur ${response.status}`);
                    }
                    const json = await response.json();
                    if(json.results){
                        setData(json.results);
                    }else if(json.genres){
                        setData(json.genres);
                    }else{
                        setData([]);
                    }
                    setTotalPages(json.total_pages);
                }catch(err){
                    setError(err.message)
                }finally{
                    setLoading(false);
                }
        }
            fetchData();
        }
    }, [url, pages])//relancer après chaque chargement d'url

    return {data, loading, error, totalPages, pages, setPages};
}