import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import "../CSS/contact.css";

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

function Contact() {
  const { user, isAuthenticated } = useAuth0();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const [postResult, setPost] = useState<any[]>([]);

  const [showErr, setErr] = useState("");

  const postMessage = async () => {
    if (name.trim() === "" || email.trim() === "" || suggestion.trim() === "") {
      alert("Please fill in the form before sending message!");
      return;
    }

    const emailfilter =/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
    const checkEmailForm = emailfilter.test(email);
    if (!checkEmailForm) {
      alert("Please enter a valid email");
      return;
    }

    await api
      .post("/suggestions", {
        name: name,
        email: email,
        comments: suggestion,
      })
      .then((response) => {
        setPost(response.data);
        console.log(postResult);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409)
          setErr("Oops! Something went wrong!");
        else console.error(error);
      });
  };

  const handleSubmitForm = (event: any) => {
    postMessage();
    event.preventDefault();
    alert("Message Sent! Thanks for the feedback!");
    window.location.reload();
  };

  return (
    <div className="container mt-40 mx-auto">
      <h1 className="contactFont mb-10"> Contact / Feedback Form</h1>

      <form className=" formCustome text-left mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            <nav className="text-white">Name: </nav> 
          </label>
          <input
            className="form-control shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 
           leading-tight focus:outline-none focus:shadow-outline-blue"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(addName) => setName(addName.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          <nav className="text-white">Email: </nav> 
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <HiOutlineMail className="h-5 w-5 text-white-700" />
            </span>
            <input
              className="form-control shadow text-white-700 appearance-none border rounded w-full py-2 pl-10 
            pr-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(addEmail) => setEmail(addEmail.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            <nav className="text-white">Message: </nav> 
          </label>
          <textarea
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-white-700 
          leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            rows={6}
            placeholder="Enter your message"
            value={suggestion}
            onChange={(addSuggestion) =>
              setSuggestion(addSuggestion.target.value)
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-black hover:bg-purple-700 text-white hover:text-black font-bold py-2 px-4 rounded 
          focus:outline-none focus:shadow-outline"
            onClick={handleSubmitForm}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
