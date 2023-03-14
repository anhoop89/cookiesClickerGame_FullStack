import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/About.css";

interface Suggestion {
  name: string;
  email: string;
  message: string;
}

const api = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    "Content-type": "application/json",
  },
});

function About() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="container form mt-10 mx-auto">
      <h1 className="readFont mainHeader"> About Us</h1>
      <br></br>
      <div className="headerTwo text-center mx-auto rounded px-8 pt-6 pb-8 mb-4">
        <label className="contactFont block mb-3">Class:</label>
        <p className="contactFont descriptorText block">
          This project was created for <br></br>
          CS 465P Full Stack Web Development <br></br>
          with Instructor Casey Bailey at <br></br>
          Portland State University <br></br>
          for Winter 2023
        </p>
      </div>

      <br></br>

      <div className="headerTwo text-center mx-auto rounded px-8 pt-6 pb-8 mb-4">
        <label className="contactFont block mb-3">Anh Ho:</label>
        {/* maybe add an image, we'll see */}
        <p className="contactFont descriptorText block">
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
        </p>
      </div>

      <br></br>

      <div className="headerTwo text-center mx-auto rounded px-8 pt-6 pb-8 mb-4">
        <label className="contactFont block mb-3">Nicholas Nguyen:</label>
        {/* maybe add an image, we'll see */}
        <p className="contactFont descriptorText block">
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
          Some important and unimportant information about this student{" "}
          <br></br>
        </p>
      </div>
    </div>
  );
}

export default About;
