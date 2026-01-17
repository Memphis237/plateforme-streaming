import React, {useState} from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useDetailsFilms from "../hook/useDetailsFilms";
import useDetailsSeries from "../hook/useDetailsSeries";
import Footer from "./Footer";

export default function DetailsSeries(){
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const navigate = useNavigate();
    const {id} = useParams();
    const [seasonData, setSeasonData] = useState(1);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const API_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=fr-FR`;
    const EPISODE_API_URL = `https://api.themoviedb.org/3/tv/${id}/season/${seasonData}?api_key=${API_KEY}&language=fr-FR`;
    const {data: serie, loading, error} = useDetailsFilms(API_URL);
    const {episodeData: episodes} = useDetailsSeries(EPISODE_API_URL);


return <>
        <Navbar/>

        {loading && 
            <div className="flex justify-center text-3xl font-bold" >Chargement en cours....</div>
        }
        {error && 
            <div className="flex justify-center text-red-500 text-3xl font-bold">{error}</div>
        }
        <div className="mt-14 mb-4 lg:ml-52 sm:ml-4 md:ml-8"  onClick={() => navigate(-1)}>
                <span className="bg-purple-800 rounded-full px-4 py-2 mt-10 mb-10 text-xl"><i className="fa fa-chevron-left text-white" aria-hidden="true"></i></span>
            </div>

        {serie && 
        <>
        <div className="bg-[#141F33] flex max-w-6xl w-full rounded-2xl mx-auto flex-col sm:flex-row">
            <div className="mr-3 ml-8 sm:mb-16 sm:mt-28 mt-16">
                <img src={`${IMAGE_BASE_URL}${serie.poster_path}`} alt={serie.title}  className="rounded-lg object-cover w-[900px] h-[300px]"/>
            </div>
            <div className="flex flex-col mb-16 sm:mt-16 mt-10 flex-wrap">
                <h1 className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent font-bold text-5xl text-center">{serie.name}</h1>
                <div className="flex justify-around mt-8 mb-5 sm:text-lg text-[13px]">
                    <h3 className="font-bold text-gray-300">Date de sortie: {new Date(serie.release_date).toLocaleDateString("fr-FR", {month: "long", year: "numeric"})}</h3>
                    <h3 className="font-bold text-gray-300">Durée: {serie.runtime} minutes</h3>
                </div>
                <p className="text-white font-bold text-lg mx-8 mb-6">{serie.overview}</p>
                <span className="font-bold text-gray-300 ml-8">Nombres de saisons: {serie.number_of_seasons}</span>
                <span className="flex justify-center mb-2 mt-2">
                        <h3 className="mr-2 bg-yellow-500 rounded-3xl py-1 px-3 font-bold sm:text-lg text-md">Notes: </h3>
                        <p className="text-yellow-500 py-1 font-extrabold sm:text-xl text-md">{serie.vote_average} /10</p>
                </span>
                <span className="flex justify-center">
                    <h3 className="mr-2 bg-black rounded-3xl py-1 px-3 font-bold sm:text-lg text-md text-white">Genres:</h3>
                    {serie.genres?.map((genre, index) =>(
                        <span key={genre.id} className="text-white cursor-pointer font-bold sm:text-xl text-md py-1" onClick={() =>navigate(`/genre/${genre.id}`)}>
                            {genre.name}{index < serie.genres.length - 1 && " / "}
                        </span>
                    ))}
                </span>
            </div>
        </div>

            <div className="flex justify-center mt-12">
                <label htmlFor="season" className="text-white font-bold text-xl relative right-5 top-2">Choisissez une saison : </label>
                <select value={seasonData} onChange={(e) => setSeasonData(e.target.value)} className="bg-[#141F33] text-white text-xl px-4 py-2 rounded-lg border-2 border-purple-800 shadow-[0_0_8px_#7c3aed]">
                    {Array.from({ length: serie.number_of_seasons }, (_, i) => i +1).map((season) =>(
                        <option key={season} value={season}>
                            Saison {season}
                        </option>    
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-14 mt-14 ml-14 gap-x-10 mr-14 lg:ml-60 lg:mr-60 sm:ml-20 sm:mr-20 md:ml-32 md:mr-32">
                {episodes && episodes.map((episode) =>(
                    <div key={episode.id} className="flex flex-col items-center bg-[#0F172B]/10 p-4 rounded-xl max-w-[500px]">
                        <h3 className="text-white font-bold text-2xl mt-8">Episode {episode.episode_number}: {episode.name}</h3>
                        <img src={`${IMAGE_BASE_URL}${episode.still_path}`} alt={episode.name} className="object-cover w-[400px] sm:w-[450px] sm:h-[250px] h-[250px] rounded-lg mt-4 mb-4"/>
                        <p className="text-white font-semibold text-lg">{episode.overview || "Pas de description disponible"}</p>
                        <p className="text-gray-600 font-bold text-lg mt-8">
                            {episode.runtime ? `Durée: ${episode.runtime} minutes` : ""}
                        </p>
                    </div>
                ))}
            </div>
        </>
        }
        <Footer/>
</>


}