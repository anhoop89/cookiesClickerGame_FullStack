import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./CSS/index.css";
import dotenv from "dotenv";
const env = dotenv.config();

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="env.VITE_CLICKERS_APP_AUTH0_DOMAIN"
        clientId="env.VITE_CLICKERS_APP_AUTH0_CLIENT_ID"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <App />
        {/* <Navbar /> */}
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
