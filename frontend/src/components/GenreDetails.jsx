import React, {useState} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import {useFetch} from "../hook/useFetch";
import Pagination from "./Pagination";
import Footer from "./Footer";

export function GenreDetails(){
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const genreName = location.state?.genreName;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const [category, setCategory] =useState("movie");
    const API_URL = `https://api.themoviedb.org/3/discover/${category}?api_key=${API_KEY}&language=fr-FR&with_genres=${id}`
    const {data: medias, loading, error, totalPages, pages, setPages} = useFetch(API_URL);
    const isLinkImage = medias.filter(media => media.poster_path); //récupérer uniquement les images avec des liens pour éviter d'avoir des cards vide

    return <>
        <Navbar/>
        <div>
            <h1 className="text-white text-3xl font-bold text-center mt-10 mb-8">{category === "movie" ? "Films" : "Séries TV"}-{genreName}</h1>
        </div>
        <div className="flex justify-center mt-10 mb-10 space-x-10">
            <button onClick={() =>setCategory("movie")} className={`text-white font-bold px-3 py-1 sm:px-6 sm:py-2 rounded-lg text-2xl text-center flex justify-center items-center w-36
                ${category === "movie" ? "bg-purple-700" : ""}`}>Films</button>

            <button onClick={() =>setCategory("tv")} className={`text-white font-bold px-3 py-1 sm:px-6 sm:py-2 rounded-lg text-2xl text-center flex justify-center items-center w-36
                ${category === "tv" ? "bg-purple-700" : ""}`}>Séries</button>
        </div>

        {loading && 
            <div className="flex justify-center text-3xl font-bold" >Chargement en cours....</div>
        }
        {error && 
            <div className="flex justify-center text-red-500 text-3xl font-bold">{error}</div>
        }
        {medias && 
            <div className="flex flex-wrap gap-8 mt-8 mb-16 ml-3">
                {isLinkImage.map((media) =>(
                    <div key={media.id} className="flex flex-col items-center" onClick={() =>navigate(`/${category === "movie" ? "movie" : "serie"}/${media.id}`)}>
                        <img src={media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}`:"no-image.png"} alt={media.title} className="object-cover max-w-[250px] w-full h-[320px] mx-4 rounded-t-xl"/>
                        <h2 className="text-white text-md text-center text-lg font-bold pt-3 truncate w-[250px] h-[40px] bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700">{media.name || media.title}</h2>
                        <p className="h-[40px] w-[250px] bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 rounded-b-xl text-lg font-bold text-center text-[#ffffffa0]">
                            {media.release_date
                            ? new Date(media.release_date).getFullYear()
                            : media.first_air_date
                            ? new Date(media.first_air_date).getFullYear()
                            : ""}
                        </p>
                    </div>
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