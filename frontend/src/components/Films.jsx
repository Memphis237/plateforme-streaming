import React, {useState} from "react";
import Navbar from "./Navbar";
import {useFetch} from "../hook/useFetch";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export function Films(){
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const [searchTerm, setSearchTerm] = useState("");
    const API_URL = searchTerm ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${searchTerm}` 
                                :`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR`;
    const {data: films, loading, error, totalPages, pages, setPages} = useFetch(API_URL);
    const isLinkImage = films.filter(film => film.poster_path); //récupérer uniquement les images avec des liens pour éviter d'avoir des cards vide
    return <>
        <Navbar/>
        {/*champs de saisie contrôllé automatimaque par react */}
        <div className="flex justify-center items-center mt-10">
            <input type="text" value={searchTerm} onChange={(e) =>{
            setSearchTerm(e.target.value);
            setPages(1);
        }} placeholder="Rechercher un film ..." className="w-1/2 px-4 py-2 my-10 rounded-lg hover:ring hover:ring-offset-0 hover:ring-purple-800 hover:shadow-lg hover:shadow-purple-900"/>
        </div>

        <h1 className="text-white font-bold ml-3 text-[35px] mt-8">Tous vos films favoris</h1>
        {loading && 
            <div className="flex justify-center text-3xl font-bold" >Chargement en cours....</div>
        }
        {error && 
            <div className="flex justify-center text-red-500 text-3xl font-bold">{error}</div>
        }
        {isLinkImage && 
            <div className="flex flex-wrap gap-8 mt-8 mb-16 ml-3">
                {isLinkImage.map((film) =>(
                    <Link to={`/movie/${film.id}`} key={film.id}>
                            <div key={film.id} className="flex flex-col items-center">
                                <img src={film.poster_path ? `${IMAGE_BASE_URL}${film.poster_path}`:"no-image.png"} alt={film.title} className="object-cover max-w-[250px] w-full h-[320px] mx-4 rounded-t-xl"/>
                                <h2 className="text-white text-md text-center text-lg font-bold pt-3 truncate w-[250px] h-[40px] bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700">{film.title}</h2>
                                <p className="h-[40px] w-[250px] bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 rounded-b-xl text-lg font-bold text-center text-[#ffffffa0]">{new Date(film.release_date).getFullYear()}</p>
                            </div>
                    </Link>
                ))}
            </div>
        }
        <Pagination
        pages ={pages}
        totalPages ={totalPages}
        onChangePage ={setPages}
        />
        <Footer/>
    </>
}