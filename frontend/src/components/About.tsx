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
    <div className="container pt-20 mt-20 mx-auto">
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
      <br></br>

      <div className="headerTwo text-center mx-auto rounded px-8 pt-6 pb-8 mb-4">

        <div className="flex flex-col md:flex-row mb-10">
          <div className="md:w-1/2 flex justify-center">
            <div className="aboutOne" alt="Anh Ho" ></div>
          </div>
          <div className="md:w-1/2 px-4 py-2 contactFont descriptorText ">
            <h2 className="text-3xl mb-2"> <strong> Anh Ho (he/him) </strong></h2>
            <p className="text-lg mb-4 px-5">
              I am working toward a Bachelor's Degree in Computer Science at Portland State University.
              I love solving technical problems.
              Moreover, what fascinates me the most is testing applications and fixing problems. I am
              enthusiastic to break down the problems into smaller pieces and work my way up using and
              applying necessary tools to tackle challenges. I am hoping to collaborate with people who
              share my vision and work to create new technologies to improve the lives of all community members.
            </p>
          </div>
        </div> <br></br>


        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex justify-center">
            <div className="aboutTwo" alt="Nicholas Nguyen" ></div>
          </div>
          <div className="md:w-1/2 px-4 py-2 contactFont descriptorText ">
            <h2 className="text-3xl mb-2"> <strong> Nicholas Nguyen (he/him) </strong></h2>
            <p className="text-lg mb-4 px-5">

              Portland State University Student pursuing a Bachelor of Science for CS.

              I am currently looking for a summer internship to anywhere for anything CS related.

              My expected graduation date is this upcoming Fall/Winter Term of 2023.

              I have experience working with C++, Python, Javascript, and Kotlin.

              In my free time I enjoy cooking, playing board games, and exercising.
            </p>
            <p className="text-lg mb-4">More information can be found at</p>
            <a className="text-lg font-bold bg-white text-blue-600" href="https://mochimunchur.github.io/CS410-FinalProject">https://mochimunchur.github.io/CS410-FinalProject</a>
            <br />
            <p className="text-lg mb-4">or</p>
            <a className="text-lg font-bold bg-white text-blue-600" href="https://github.com/MochiMunchur">https://github.com/MochiMunchur</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
