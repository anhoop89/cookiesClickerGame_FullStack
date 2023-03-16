import './CSS/App.css'
import './CSS/navbar.css'
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
        if (user && user?.email_verified === true) {
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
                        console.log("noted testing: " + error.response + error.response.status);
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


    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div>
            {/* navbar */}
            <div >

                <nav className='navbar flex flex-wrap items-center justify-between px-6 py-4 bg-gradient-to-r from-red-500 to-black-500'>
                    <div className="flex items-center justify-between">
                        <div >
                            <Link to="/" className="flex items-center mr-10">
                                <img className="h-12" src="./src/img/logo.png" alt="cookies logo"></img>
                            </Link>
                        </div>

                        <button className="flex menu-btn menu-icon" onClick={handleMenuToggle}>
                            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
                        </button>
                        <ul className={`menu-list ${isOpen ? "active" : ""}`}>
                            <li>
                                <Link to="/" className="block mt-4 md:inline-block
                                     md:mt-0 mr-6">
                                    Home</Link>
                            </li>
                            <li>
                                <Link to="/Settings" className="block mt-4 md:inline-block
                                     md:mt-0 mr-6">Settings</Link>
                            </li>
                            <li>
                                <Link to="/Contact" className="block mt-4 md:inline-block md:mt-0
                                      mr-6"> About
                                </Link>
                            </li>
                            <li>
                                <Link to="/Play" className="block mt-4 md:inline-block
                                     md:mt-0 mr-6">Contact</Link>
                            </li>
                            <li className='avoidLi'>
                                {!isAuthenticated && !isLoading ? (
                                    <Link to="/"> <button onClick={handleLoginClick}>Log in</button> </Link>
                                ) : (<Link to="/"> <button onClick={handleLogoutClick}
                                className="py-2 px-4 "
                                > Log Out</button></Link>
                                )}
                            </li>
                        </ul>
                        <div className="md:ml-4">
                            <Link to="/Play" className="inline-block py-2 px-4 text-white rounded-full 
                                            bg-red-700 hover:bg-red-600">Play</Link>
                        </div>
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
            <nav className="navbar">
                <div className="navbar-container">
                </div>
            </nav>
        </div>
    )
}

export default App;


