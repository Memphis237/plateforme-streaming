import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    const menuScrollTo = () =>{
        addEventListener("click", () =>{
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }
    const menuScroll = () =>{
        addEventListener("click", () =>{
            window.scrollTo({
                top: 0
            });

        });
    }
    return (
        <footer className="bg-black text-white py-12 mt-20">
            <div className="sm:flex sm:justify-around sm:mb-8 sm:flex-wrap grid grid-cols-1 gap-8 text-center sm:text-left">
                <div>
                    <h1 className="bg-gradient-to-r from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent text-2xl font-bold cursor-pointer hover:scale-105 transition-all" onClick={menuScrollTo}>StreamFlix</h1>
                    <p className="text-[#ffffffef] text-lg mt-1">Plateforme de streaming proposant une <br/>large collection de films et séries.</p>
                </div>
                <div>
                    <h1 className="text-white text-2xl font-bold">Liens rapides</h1>
                    <ul className="flex flex-col text-center">
                        <li onClick={menuScroll} className="mt-1 text-lg font-semibold text-[#ffffffbe] hover:text-purple-500 hover:scale-105 transition-all delay-75">Accueil</li>
                        <li onClick={() =>navigate("/Films")} className="text-lg font-semibold text-[#ffffffbe] hover:text-purple-500 hover:scale-105 transition-all delay-75">Films</li>
                        <li onClick={() =>navigate("/Series")} className="text-lg font-semibold text-[#ffffffbe] hover:text-purple-500 hover:scale-105 transition-all delay-75">Séries</li>
                        <li onClick={() =>navigate("/Genres")} className="text-lg font-semibold text-[#ffffffbe] hover:text-purple-500 hover:scale-105 transition-all delay-75">Genres</li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-white text-2xl font-bold">Suivez-nous</h1>
                    <ul className="flex justify-center">
                        <a href="https://x.com/" target="_blank" className="my-1 text-2xl font-semibold mx-2 mt-3 hover:text-purple-500 hover:scale-150 transition-all delay-75 cursor-pointer hover:translate-y-[-5px]"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                        <a href="https://www.instagram.com/" target="_blank" className="my-1 text-2xl font-semibold mx-2 mt-3 hover:text-purple-500 hover:scale-150 transition-all delay-75 cursor-pointer hover:translate-y-[-5px]"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                        <a href="https://www.youtube.com/" target="_blank" className="my-1 text-2xl font-semibold mx-2 mt-3 hover:text-purple-500 hover:scale-150 transition-all delay-75 cursor-pointer hover:translate-y-[-5px]"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                    </ul>
                </div>
                <div></div>
            </div>

                <div style={{background: "linear-gradient(to right, transparent 10%, #7c3aed 50%, transparent 90%)"}} className="h-[3px] mt-5 mb-5"/>

                {/* Copyright */}
                <div className="text-center text-gray-400 text-sm">
                    <p>&copy; 2024 Bibliothèque de Films. Tous droits réservés.</p>
                </div>
        </footer>
    );
}