import './CSS/App.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './components/Home';
import Contact from './components/Contact';
import Play from './components/Play';
import Settings from './components/Settings';
import About from './components/About';
// import Info from './components/Info';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {
        "Content-type": "application/json",
    },
});


function App() {

    const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showErr, setErr] = useState("");
    const [postResult, setPost] = useState<any[]>([]);
    const navigate = useNavigate();

    const handleLoginClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await loginWithPopup();   
        navigate("/");
    };

    useEffect(() => {    
        console.log("verified : " + user?.email_verified);
        if (user && user?.email_verified === true){
            const postUser = async () => {
                await api
                    .post("/users", {
                        name: user.nickname,
                        email: user.email,
                        userClicks: 0,
                        userUpgradeOne: 0,
                        userUpgradeTwo: 0,
                    })
                    .then((response) => {
                        setPost(response.data);
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log( "noted testing: " + error.response + error.response.status);
                        if (error.response && error.response.status === 409)
                            console.log("A new user that name or email already exists!");
                        else {
                            console.error(error);
                            setErr(error.response.status);
                        }
                    });
            };
            postUser();
        } 
        if (user?.email_verified === false) {
            alert("please verify your email! Thanks")
        }
    }, [user]);    
      

    const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        logout();
    };



    return (
        <div>
            {/* navbar */}
            <div className="justify-between items-center py-4 px-6">
                <nav className='relative p-4 bg-gradient-to-r from-red-500 to-black-500
                                '>
                    {/* flex container */}
                    <div className="flex items-center justify-between" >
                        <div className="pt-2">
                            <Link to="/" >  <img className=" h-12 " src="./src/img/logo.png" alt="cookies logo"></img></Link>
                        </div>

                        <div className="hidden md:flex space-x-6 ">
                            <Link to="/" 
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
                                    py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Home</Link>
                            {/* testing tab */}
                            {/* <Link to="/info"
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
                                    py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Info</Link> */}
                            <Link to="/settings"
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
                                    py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Settings</Link>
                            <Link to="/about"
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
                                    py-2 px-4 border border-blue-500 hover:border-transparent rounded'>About</Link>                           
                            <Link to="/contact" 
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
                                    py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Contact</Link>
                            {!isAuthenticated && !isLoading ? (
                                <Link to="/"> <button onClick={handleLoginClick}>Log in</button> </Link>
                            ) : (<Link to="/"> <button onClick={handleLogoutClick}>Log out</button> </Link>

                            )}

                        </div>
                        <Link to="/Play" className="items-center p-3 px-6 pt-2 text-white rounded-full bg-red-700 hover:bg-red-600"
                        >PLAY</Link>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* testing tab */}
                    {/* <Route path="/Info" element={<Info />} /> */}
                    <Route path="/About" element={<About />} />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Play" element={<Play />} />
                </Routes>
            </div>

            <div className='container mx-auto px-4 mt-10  '>
                {isAuthenticated ? (
                    <div>
                        <p className="readFont">Logged in as: {user?.nickname}</p>
                    
                        <button onClick={handleLogoutClick}>Logout</button>
                    </div>
                ) : ""}
            
            </div>
        </div>
    )
}

export default App; 


