import './CSS/App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
import Contact from './components/Contact';
import Play from './components/Play';


import { useAuth0 } from '@auth0/auth0-react';

function App() {

    const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();



    const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        loginWithPopup();
    };

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
                            <Link to="/info"
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
                                    py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Info</Link>
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
                    <Route path="/Info" element={<Info />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Play" element={<Play />} />
                </Routes>
            </div>

            <div className='container mx-auto px-4 mt-10  '>
                {isAuthenticated ? (
                    <div>
                        <p>Welcome, {user?.nickname}!</p>
                    
                        <button onClick={handleLogoutClick}>Logout</button>
                    </div>
                ) : ""}
            

            <div className="text-left mx-auto ">
                {isAuthenticated ? (
                    <div className='whitespace-pre-wrap overflow-x-auto '>
                        <h2> User is logged in</h2>
                        <h3>User Details:</h3>
                        <pre>{JSON.stringify(user, null, 1)}</pre>
                    </div>
                ) : ""}

            </div>

            </div>
        </div>
    )
}

export default App; 
