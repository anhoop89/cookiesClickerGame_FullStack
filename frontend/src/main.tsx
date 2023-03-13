import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './CSS/index.css'
import dotenv from 'dotenv';


import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0Provider
            domain='anhoop89.us.auth0.com'
            clientId= '3p2fQA9DF5ml0KwVJGmpJcPdYKG2MdKp'
            authorizationParams={{redirect_uri: window.location.origin}}
            >
                
            <App />
            {/* <Navbar /> */}
            </Auth0Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
