import React, {useState} from "react";
import Navbar from "./Navbar";
import { useFetch } from "../hook/useFetch";
import {Link} from "react-router-dom";

export function Genres(){
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [category, setCategory] = useState("movie");
    const API_URL = `https://api.themoviedb.org/3/genre/${category}/list?api_key=${API_KEY}&language=fr-FR`;
    const {data: genres, loading, error} =useFetch(API_URL);

    const handleChangeCategory = (newCategory) =>{
        setCategory(newCategory);
    }
    
    return <>
        <Navbar/>
        <div className="flex justify-center mt-10 mb-10 space-x-10">
            <button onClick={() =>handleChangeCategory("movie")} className={`text-white font-bold px-3 py-1 sm:px-6 sm:py-2 rounded-lg text-2xl text-center flex justify-center items-center w-36
                ${category === "movie" ? "bg-purple-700" : ""}`}>Films</button>

            <button onClick={() =>handleChangeCategory("tv")} className={`text-white font-bold px-3 py-1 sm:px-6 sm:py-2 rounded-lg text-2xl text-center flex justify-center items-center w-36
                ${category === "tv" ? "bg-purple-700" : ""}`}>Séries</button>
        </div>

        
            <div className="flex flex-wrap gap-8 mt-10 ml-2">
                {loading && 
                    <div className="flex justify-center text-3xl font-bold" >Chargement en cours....</div>
                }
                {error && 
                    <div className="flex justify-center text-red-500 text-3xl font-bold">{error}</div>
                }
                {genres && 
                    genres.map(genre =>(
                        <Link to={`/genre/${genre.id}`} key={genre.id} state={{genreName: genre.name}} ><div className="text-center font-bold text-[#ffffffc1] hover:bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700
                        w-[300px] h-[50px] px-4 py-9 text-xl flex items-center justify-center rounded-xl">{genre.name}</div></Link>
                    ))
                }
            </div>
    </>
}