import React from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useDetailsFilms from "../hook/useDetailsFilms";
import Footer from "./Footer";

export default function DetailsFilms(){
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const navigate = useNavigate();
    const {id} = useParams();
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
    const {data: movie, loading, error} = useDetailsFilms(API_URL);

    return <>
            <Navbar/>

            {loading && 
                <div className="flex justify-center text-3xl font-bold" >Chargement en cours....</div>
            }
            {error && 
                <div className="flex justify-center text-red-500 text-3xl font-bold">{error}</div>
            }
            <div className="mt-14 mb-4 lg:ml-52 sm:ml-4 md:ml-8" onClick={() => navigate(-1)}>
                <span className="bg-purple-800 rounded-full px-4 py-2 mt-10 mb-10 text-xl"><i className="fa fa-chevron-left text-white" aria-hidden="true"></i></span>
            </div>
            {movie && (
                <div className="bg-[#141F33] flex max-w-6xl w-full rounded-2xl mx-auto flex-col sm:flex-row">
                    <div className="mr-3 ml-8 sm:mb-16 mt-16">
                        <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/no-image.png"} alt={movie.title} className="rounded-lg object-cover w-[900px] h-[400px]"/>
                    </div>
                    <div className="flex flex-col mb-16 sm:mt-28 mt-10 flex-wrap">
                        <h1 className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent font-bold text-4xl text-center">{movie.title}</h1>
                        <div className="flex justify-around mt-5 mb-5 sm:text-lg text-[13px]">
                            <h3 className="font-bold text-gray-300">Date de sortie: {movie.release_date && new Date(movie.release_date).toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"})}</h3>
                            <h3 className="font-bold text-gray-300">Durée: {movie.runtime} minutes</h3>
                        </div>
                        <p className="text-white font-bold text-lg mx-8 mb-6">{movie.overview}</p>
                        <span className="flex justify-center mb-2 mt-2">
                                <h3 className="mr-2 bg-yellow-500 rounded-3xl py-1 px-3 font-bold text-lg">Notes: </h3>
                                <p className="text-yellow-500 py-1 font-extrabold text-xl">{movie.vote_average} / 10</p>
                        </span>
                        {movie.adult &&
                        <p>Films réservé aux adultes</p>
                        }
                        <span className="flex justify-center mt-2">
                            <h3 className="mr-2 bg-black rounded-3xl py-1 px-3 font-bold text-lg text-white">Genres:</h3>
                            {movie.genres?.map((genre, index) =>(
                                <span key={genre.id} className="text-white cursor-pointer font-bold text-xl py-1" onClick={() =>navigate(`/genre/${genre.id}`)}>
                                    {genre.name}{index < movie.genres.length - 1 && " / "}
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            )}
            <Footer/>
    </>


}
