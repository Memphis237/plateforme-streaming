import React, { useState } from "react";
import Navbar from "./Navbar";
import heroImage from "../assets/image_librairie.jpg";
import { useFetch } from "../hook/useFetch";
import Footer from "./Footer";

export function Home(){
    const [index, setIndex] = useState(0);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR`;
    const {data: movie, loading, error} = useFetch(API_URL);
    const nextSlide = () =>{
        setIndex((indexPage) => indexPage === movie.length -1 ? 0 : indexPage + 1);
    }
    const prevSlide = () =>{
        setIndex((indexPage) => indexPage === 0 ? movie.length - 1 : indexPage - 1);
    }
    return <>
        <Navbar/>
        <div>
                <img
                src={heroImage}
                alt="Librairie"
                className="inset-0 w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 sm:h-[690px] h-[880px]" style={{background: "radial-gradient(circle, rgba(0, 0, 0, 0.5) 10%, rgba(0, 0, 0, 1) 100%)"}}/>
                <div className="flex justify-center relative bottom-80">
                    <h1 className="text-white font-bold lg:text-4xl md:text-4xl sm:text-4xl text-2xl text-center flex-wrap px-10">Découvrez une collection infinie des meilleurs Films, Séries TV  <br/>et bien plus encore !</h1>
                </div>
        </div>
        <div className="flex justify-center sm:text-3xl text-2xl font-semibold mt-4 text-center mb-2">
            <h1 className="text-white">Regardez ce que vous voulez, quand vous voulez, où vous voulez.</h1>
        </div>
        <div className="flex justify-center sm:text-lg text-[7px]"><p className="text-[#ffffffac] text-center">Emportez partout avec vous, vos films, séries et sagas préférées.</p></div>
        {loading && 
            <div className="flex justify-center text-3xl font-bold" >Chargement en cours....</div>
        }
        {error && 
            <div className="flex justify-center text-red-500 text-3xl font-bold">{error}</div>
        }
        {/*afficher les données seulement lorsque elle sont prêt */}
        {/**caroussel */}
        {movie.length && 
        <div className="flex justify-center space-x-6 mt-24 mb-24 flex-wrap">
            <div>
                <img src={`${IMAGE_BASE_URL}${movie[(index -1 + movie.length)%movie.length].poster_path}`} alt={`${IMAGE_BASE_URL}${movie[(index - 1 + movie.length)%movie.length].title}`} 
                    onClick={prevSlide} className="object-contain h-[300px] w-[220px] rounded-2xl mt-12 opacity-50 hover:scale-105 transition ease-in-out cursor-pointer"/>
                <h2 className="text-white font-bold text-center text-lg w-[220px] h[10px] flex-wrap mt-1 opacity-55">{`${movie[(index - 1 + movie.length)%movie.length].title}`}</h2>
                <button className="bg-black/60 rounded-full px-3 py-1 relative left-[32px] bottom-[190px]" onClick={prevSlide}>
                    <i className="fa fa-chevron-left text-white text-2xl relative right-[2px] top-[1px]" aria-hidden="true"></i>
                </button>
            </div>
            <div>
                <img src={`${IMAGE_BASE_URL}${movie[index].poster_path}`} alt={`${IMAGE_BASE_URL}${movie[index].title}`} 
                    className="object-contain h-[400px] w-[300px] rounded-3xl hover:scale-110 transition ease-in-out cursor-pointer"/>
                <h2 className="text-white text-center mt-4 font-bold text-xl w-[220px] h[10px] relative left-10">{`${movie[index].title}`}</h2>
            </div>
            <div>
                <img src={`${IMAGE_BASE_URL}${movie[(index + 1)%movie.length].poster_path}`} alt={`${IMAGE_BASE_URL}${movie[(index + 1)%movie.length].title}`} 
                    onClick={nextSlide} className="object-contain h-[300px] w-[220px] rounded-2xl mt-12 opacity-50 hover:scale-105 transition ease-in-out cursor-pointer"/>
                    <h2 className="text-white font-bold text-center text-lg w-[220px] h[10px] flex-wrap mt-1 opacity-55">{`${movie[(index + 1)%movie.length].title}`}</h2>
                    <button className="relative left-[145px] bottom-[190px] bg-black/60 rounded-full px-3 py-1" onClick={nextSlide}>
                        <i className="fa fa-chevron-right text-white text-2xl relative left-[2px] top-[1px]" aria-hidden="true"></i>
                    </button>
            </div>
        </div>
        }

        <div className="flex justify-center sm:space-x-32 mt-20 mb-20 flex-wrap">
            <div className="flex flex-col p-6 my-5">
                <i className="fa fa-film text-purple-500 text-[65px] text-center mb-12" aria-hidden="true"></i>
                <h1 className="text-[#ffffffac] text-3xl text-center font-bold">Un divertissement <br/>sans fin.</h1>
            </div>

            <div className="flex flex-col p-6 my-5">
                <i className="fa fa-mobile text-purple-500 text-[100px] text-center mb-5" aria-hidden="true"></i>
                <h1 className="text-[#ffffffac] text-3xl text-center font-semibold">Disponible sur tous <br/>vos appareils.</h1>
            </div>

            <div className="flex flex-col p-6">
                <i className="fa fa-bell text-purple-500 text-[60px] text-center mb-16 relative top-4" aria-hidden="true"></i>
                <h1 className="text-[#ffffffac] text-3xl text-center font-semibold">Restez informé des <br/>dernières sorties.</h1>
            </div>
        </div>

        <div className="flex justify-center mt-10 mb-10 sm:space-x-20 flex-wrap">
            <div className="bg-gray-900 flex flex-col p-6 w-80 rounded-2xl hover:scale-110 transition ease-in-out delay-150 hover:translate-y-[-20px] hover:shadow-[0_0_15px_#7c3aed] my-8">
                <h1 className="text-white text-[40px] font-bold mb-8 text-center">Basique</h1>
                <h3 className="text-purple-500 text-[30px] mb-8 font-bold text-center">3,99 €/mois</h3>
                <p className="text-white text-xl font-semibold mb-2"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Diffusez sur un appareil</p>
                <p className="text-white text-xl font-semibold mb-2"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Aucun pub</p>
                <p className="text-white text-xl font-semibold mb-5"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Accès aux contenus de base</p>
                <button className="text-white bg-purple-500 rounded-3xl px-6 py-3 font-bold hover:bg-purple-800">S'abonner</button>
            </div>

            <div className="bg-gray-900 flex flex-col p-6 w-80 rounded-2xl border-2 border-purple-400 hover:scale-110 transition ease-in-out delay-150 hover:translate-y-[-20px] hover:shadow-[0_0_25px_#7c3aed] shadow-[0_0_15px_#7c3aed] my-8">
                <button className="bg-purple-500 text-white rounded-3xl px-4 py-1 font-bold w-44 ml-12 relative bottom-10 shadow-[0_0_15px_#7c3aed]">Le plus populaire</button>
                <h1 className="text-white text-[40px] font-bold mb-8 text-center">Pro</h1>
                <h3 className="text-purple-500 text-[30px] mb-8 font-bold text-center">5,99 €/mois</h3>
                <p className="text-white text-xl font-semibold mb-2"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Streamez sur 5 appareils</p>
                <p className="text-white text-xl font-semibold mb-2"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Aucun pub</p>
                <p className="text-white text-xl font-semibold mb-4"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Photo de profil animée</p>
                <button className="text-white bg-purple-500 rounded-3xl px-6 py-3 font-bold mt-8">S'abonner</button>
            </div>

            <div className="bg-gray-900 flex flex-col p-6 w-80 rounded-2xl hover:scale-110 ease-in-out delay-150 hover:translate-y-[-20px] hover:shadow-[0_0_15px_#7c3aed] my-8">
                <h1 className="text-white text-[40px] font-bold mb-8 text-center">Premium</h1>
                <h3 className="text-purple-500 text-[30px] mb-8 font-bold text-center">10,99 €/mois</h3>
                <p className="text-white text-xl font-semibold mb-2"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Diffusez sur 10 appareils</p>
                <p className="text-white text-xl font-semibold mb-2"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Aucun pub</p>
                <p className="text-white text-xl font-semibold mb-10"><i className="fa fa-check-square-o text-purple-500 text-3xl mr-2" aria-hidden="true"></i>Accès à tous les contenus</p>
                <button className="text-white bg-purple-500 rounded-3xl px-6 py-3 font-bold">S'abonner</button>
            </div>
        </div>
        <Footer/>
    </>
}