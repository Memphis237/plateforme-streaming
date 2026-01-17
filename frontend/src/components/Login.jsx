import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchLogin = async (e) =>{
        e.preventDefault();

        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user, password})
        })
        
        const json = await response.json();
        if(response.ok && json.token){
            localStorage.setItem("token", json.token);
            //vider les champs après une connexion réussie
            setUser("");
            setPassword("");
            setData(json);
            navigate("/");
        }else{
            setData(json);
        }
        }catch(err){
            console.log("erreur:", err)
            setError("Une erreur est survenue. Veuillez réessayer.");
        }

        

    }
    return <>
        <div className="flex justify-center relative top-[200px]">
            <form onSubmit={fetchLogin} className="flex flex-col bg-[#0f172a] max-w-3xl rounded-2xl p-14 border border-[#334155]">
                <div className="text-[#ffffffe2] flex justify-center text-4xl font-bold mb-10">Connexion</div>
                {data.message && 
                    <div className="text-green-500 bg-green-950/70 px-6 py-3 rounded-lg text-xl">{data.message}</div>
                }
                {data.error &&
                    <div className="text-red-500 bg-red-950/70 px-6 py-3 rounded-lg text-xl">{data.error}</div>
                }
                {error && 
                    <div className="text-red-500 bg-red-950/70 px-6 py-3 rounded-lg text-xl">{error}</div>
                }
                <label htmlFor="username" className="text-white mb-1 mt-4">Nom:</label>
                <input type="text" value={user} onChange={(e) =>setUser(e.target.value)} id="username" placeholder="entrer votre nom" className="px-2 rounded-md text-lg h-12 w-[400px] bg-[#071127] border border-[#334155] hover:shadow-[0_0_6px_#7c3aed] focus:shadow-[0_0_6px_#7c3aed] outline-none focus:text-white text-[#ffffffa0]"/>
                <label htmlFor="pass" className="text-white mb-1 mt-7">Mot de passe:</label>
                <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} id="pass" placeholder="......." className="px-2 rounded-md text-lg h-12 w-[400px] bg-[#071127] border border-[#334155] hover:shadow-[0_0_6px_#7c3aed] focus:shadow-[0_0_6px_#7c3aed] outline-none focus:text-white placeholder:text-4xl text-[#ffffffa0]"/>
                <button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition delay-150 text-white rounded-md mt-12 h-10 text-xl font-semibold mb-5 py-1 pb-1">Se connecter</button>
                <div className="flex justify-center">
                    <span className="text-white mr-2">Pas encore membre ?</span><Link to="/Signup" className="text-purple-500 font-bold text-lg relative bottom-[1px]">Créer un compte</Link>
                </div>
            </form>
        </div>
    </>
} 
