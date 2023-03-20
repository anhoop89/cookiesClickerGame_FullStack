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
import { useEffect, useState, useRef   } from 'react';
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
    const dispearMenu = useRef("");
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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


    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dispearMenu.current && !(dispearMenu.current as any).contains(event.target)) {
          // Handle outside click of the menu
          setIsOpen(false);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
      // remove listener event
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dispearMenu]);

    return (
        <div>
            {/* navbar */}
            <div className='resizeContainer' >
                <nav className='navbar flex flex-wrap items-center justify-between px-2 shadow-lg'>
                    <div ref={dispearMenu} className="flex items-center justify-between w-full" >
                        
                        <div>
                            <Link to="/">
                                <div className="logoBanner" alt="cookies logo"></div>
                            </Link>
                        </div>

                        <button className="flex menu-btn menu-icon" onClick={handleMenuToggle}>
                            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
                        </button>
                        <ul className={`menu-list ${isOpen ? "active" : ""} flex-grow flex justify-end`}>
                            <li>
                                <Link to="/" className="block mt-4 md:inline-block
                                    md:mt-5 mr-5">Home</Link>
                            </li>                          
                            <li>
                                <Link to="/About" className="block mt-4 md:inline-block 
                                    md:mt-5 mr-5"> About
                                </Link>
                            </li>
                            <li>
                                <Link to="/Contact" className="block mt-4 md:inline-block
                                     md:mt-5 md:mr-5 lg:mr-7">Contact</Link>
                            </li>
                            <li>
                                <Link to="/Settings" className="block mt-4 md:inline-block 
                                    md:mt-5 mr-5">Settings</Link>
                            </li>
                            <li className='mr-5'>
                                {!isAuthenticated && !isLoading ? (
                                    <Link to="/" className='loginout-button '> <button onClick={handleLoginClick} className="py-2 px-4 "
                                    ><nav>Log</nav>In</button> </Link>
                                ) : (<Link to="/" className='loginout-button'> <button onClick={handleLogoutClick}
                                    className="py-2 px-4 "
                                    ><nav>Log</nav>Out</button></Link>
                                )}
                            </li>
                        </ul>
                        <div className="mr-20 play-button">
                            <Link to="/Play" className=" playButton py-5 px-4 rounded-full
                             text-white hover:text- bg-red-700">Play</Link>
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

            <div className='container mx-auto px-4 mt-10  mb-40'>
                {isAuthenticated ? (
                    <div >
                        <p className="readFont mb-5">Logged in as: {user?.nickname}</p>
                        <button  onClick={handleLogoutClick}>Logout</button>
                    </div>
                ) : ""}
            </div>
        </div>
    )
}

export default App;


