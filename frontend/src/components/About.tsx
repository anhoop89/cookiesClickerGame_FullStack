import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/About.css";
import "../CSS/About.css";

interface Suggestion {
interface Suggestion {
  name: string;
  email: string;
  message: string;
}

const api = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    "Content-type": "application/json",
    "Content-type": "application/json",
  },
});

function About() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="container form mt-10 mx-auto">
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
      <br></br>

      <div className="headerTwo text-center mx-auto rounded px-8 pt-6 pb-8 mb-4">
        <label className="contactFont block mb-3">Nicholas Nguyen (he/him):</label>
        <img className="readImg" src="./src/img/nicholas.png"></img>
        <p className="contactFont descriptorText block">
          Portland State University Student pursuing a Bachelor of Science for CS.
          <br></br>
          I am currently looking for a summer internship to anywhere for anything CS related.
          <br></br>
          My expected graduation date is this upcoming Fall/Winter Term of 2023.
          <br></br>
          I have experience working with C++, Python, Javascript, and Kotlin.
          <br></br>
          In my free time I enjoy cooking, playing board games, and exercising.
          <br></br>
          More information can be found at 
          <br></br>
          <a className="urlFont" href="https://mochimunchur.github.io/CS410-FinalProject">https://mochimunchur.github.io/CS410-FinalProject</a>
          <br></br> 
          or 
          <br></br>
          <a className="urlFont" href="https://github.com/MochiMunchur">https://github.com/MochiMunchur</a>
        </p>
      </div>
      </div>
    </div>
  );
}

export default About;
