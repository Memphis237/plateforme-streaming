import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token){
        return null;
    }

    try {
        return jwtDecode(token);
    } catch {
        localStorage.removeItem("token");
        return null;
    }
    }

export default function Navbar(){
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(getUserFromToken());
    const [menuToggle, setMenuToggle] = useState(false);

    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
        navigate("/Login");
    }

    return <header>
        <nav className="bg-neutral-900/60 backdrop-blur-md sticky top-0 z-50 py-6">
            {/**desktop */}
            <div className="justify-between items-center hidden sm:flex mr-6 ml-6">
                <h1 className="bg-gradient-to-r text-4xl font-bold from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent hover:scale-105">
                    <Link to="/" onClick={() =>{
                        if(location.pathname === "/"){
                            window.location.reload();
                        }
                    }} className="cursor-pointer"><i className="fa fa-film mr-1" aria-hidden="true"></i>StreamFlix</Link>
                </h1>
                <ul className="flex text-md space-x-16">
                    <li className="text-white font-bold hover:text-purple-500 hover:scale-110 text-xl mt-1">
                        <Link to="/Films" onClick={() =>{
                            if(location.pathname === "/Films"){
                            window.location.reload();
                        }
                        }}>Films TV</Link>
                    </li>
                    <li className="text-white font-bold hover:text-purple-500 hover:scale-110 text-xl mt-1">
                        <Link to="/Series" onClick={() =>{
                            if(location.pathname === "/Series"){
                            window.location.reload();
                        }
                        }}>Séries TV</Link>
                    </li>
                    <li className="text-white font-bold hover:text-purple-500 hover:scale-110 text-xl mt-1">
                        <Link to="/Genres" onClick={() =>{
                            if(location.pathname === "/Genres"){
                            window.location.reload();
                        }
                        }}>Genres</Link>
                    </li>
                    {user ? (
                    <li className="">
                        <span className="text-white mr-4 font-bold text-lg">
                            Bonjour, {user.name}
                        </span>
                        <button onClick={logout} className="text-lg text-white bg-purple-500 px-4 py-1 rounded-3xl pb-2 hover:bg-purple-700 hover:scale-105">
                            se déconnecter
                        </button>
                    </li>
                    ) : (
                    <li className="">
                        <button onClick={() =>navigate("/Login")} className="text-lg text-white bg-purple-500 px-4 py-1 rounded-3xl pb-2 hover:bg-purple-700 hover:scale-105">
                            se connecter
                        </button>
                    </li>
                    )}
                </ul>
            </div>
                {/**mobile */}
                <div className="flex sm:hidden justify-between items-center ml-2 mr-2 relative bottom-2">
                    <h1 className="bg-gradient-to-r mt-1 text-3xl font-bold from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent hover:scale-105">
                        <Link to="/" onClick={() =>{
                        if(location.pathname === "/"){
                            window.location.reload();
                        }
                        }}><i className="fa fa-film mr-1" aria-hidden="true"></i>StreamFlix</Link>
                    </h1>
                    <button onClick={() => setMenuToggle(!menuToggle)}>
                        <span className="bg-black px-1 rounded-md text-2xl border-2 border-[#ffffff84]"><i className="fa fa-bars text-[#ffffff7d]" aria-hidden="true"></i></span>
                    </button>
                </div>

                <ul className={`${menuToggle ? "block" : "hidden"} sm:hidden`}>
                    <li className="flex justify-start items-center hover:text-purple-400 font-bold text-white ml-2 my-4">
                        <Link to="/Films" onClick={() =>{
                            if(location.pathname === "/Films TV"){
                            window.location.reload();
                        }
                        }}>Films TV</Link>
                    </li>
                    <li className="flex justify-start items-center hover:text-purple-400 font-bold text-white ml-2 my-4">
                        <Link to="/Series" onClick={() =>{
                            if(location.pathname === "/Series TV"){
                            window.location.reload();
                        }
                        }}>Séries TV</Link>
                    </li>
                    <li className="flex justify-start items-center hover:text-purple-400 font-bold text-white ml-2 my-4">
                        <Link to="/Genres" onClick={() =>{
                            if(location.pathname === "/Genres"){
                            window.location.reload();
                        }
                        }}>Genres</Link>
                    </li>
                    {user ? (
                    <li className="flex items-center ml-2 my-4">
                        <span className="text-white mr-4">
                            Bonjour, {user.name}
                        </span>
                        <button onClick={logout} className="text-lg text-white bg-purple-500 px-4 py-1 rounded-3xl pb-2 hover:bg-purple-700">
                            se déconnecter
                        </button>
                    </li>
                    ) : (
                    <li className="flex items-center ml-2 my-4">
                        <button onClick={() =>navigate("/Login")} className="text-lg text-white bg-purple-500 px-4 py-1 rounded-3xl hover:bg-purple-700 pb-2">
                            se connecter
                        </button>
                    </li>
                    )}
                </ul>
        </nav>
    </header>
}
