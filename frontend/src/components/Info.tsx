// testing purpose first
// This component uses for testing GET/POST/PUT resquest from the frontend.
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  name: string;
  email: string;
  userClicks: number;
  userUpgradeOne: boolean;
  userUpgradeTwo: boolean;
}

const api = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    "Content-type": "application/json",
  },
});

function Info() {
  const { user, isAuthenticated } = useAuth0();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [getUsers, setUsers] = useState([]);
  const [findResult, setFind] = useState<UserData | null>(null);
  const [postResult, setPost] = useState<any[]>([]);
  const [deleteResult, setDelete] = useState<any[]>([]);

  const [showErr, setErr] = useState("");
  // show data and hide data
  const [showData, setShowData] = useState(false);

  // get all the user from database
  const getUsersButton = async () => {
    await api
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setShowData(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // add a new user
  const postUser = async () => {
    if (name.trim() === "" || email.trim() === "") {
      alert("Please fill in the form before submitting!");
      return;
    }

    const emailfilter =
      /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
    const checkEmailForm = emailfilter.test(email);
    if (!checkEmailForm) {
      alert("Please enter a valid email");
      return;
    }

    await api
      .post("/users", {
        name: name,
        email: email,
        userClicks: 99, //default for testing
        userUpgradeOne: 99, //default for testing
        userUpgradeTwo: 99, //default for testing
      })
      .then((response) => {
        setPost(response.data);
        setErr("");
        console.log(response.data);
      })
      .catch((error) => {
        // doesnt have to worry about this since auth0 already handles this
        // if (error.response && error.response.status === 409)
        //     setErr("A new user that name or email already exists!");
        console.error(error);
      });
  };

  // stop reloading the page when submitting the form
  const handleSubmitForm = (event: any) => {
    postUser();
    event.preventDefault();
  };

  // find user based on username.
  const findUser = async () => {
    await api
      .get(`/user/${username}`)
      .then((response) => {
        console.log(response.data);
        setFind(response.data);
        response.data.length === 1
          ? console.log(
              "we found a result here: \n" + JSON.stringify(response.data)
            )
          : console.log("NOT FOUND!");
        setShowData(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete user based on username.
  const deleteUser = () => {
    api
      .delete(`/user/${username}`)
      .then((response) => {
        setDelete(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(username);
  };

  // hide/show data
  const hideData = () => {
    setShowData(false);
    setUsers([]);
  };

  return (
    <div className="mt-20 mb-10">
      <h1>Get Request!</h1> <br></br>
      {isAuthenticated && (
        <>
          {!showData ? (
            <button onClick={getUsersButton}>Show Info</button>
          ) : (
            <button onClick={hideData}>Hide Info</button>
          )}
          <ul style={{ textAlign: "left" }}>
            {getUsers.map((user: any) => (
              <li key={user.id}>
                Name: {user.name} <br />
                &emsp; Email: {user.email}
              </li>
            ))}
          </ul>
        </>
      )}
      <br></br>
      <h1>POST Request!</h1>
      <form className="container flex flex-col pt-2 mt-3 justify-center">
        <label className="mb-4">
          Name:
          <input
            className="ml-2"
            type="text"
            value={name}
            onChange={(addName) => setName(addName.target.value)}
          />
        </label>
        <label className="mb-4">
          Email:
          <input
            className="ml-2"
            type="email"
            value={email}
            onChange={(addEmail) => setEmail(addEmail.target.value)}
          />
        </label>

        {showErr ? (
          <div className="px-5 py-5 text-red-600 font-bold bg-yellow-300 w-auto mx-auto block">
            {showErr}
          </div>
        ) : (
          ""
        )}
        <button className="mt-5 w-40 block mx-auto" onClick={handleSubmitForm}>
          Add User
        </button>
      </form>
      <br></br>
      <br></br>
      <h1>Find/Delete Request!</h1>
      <div className="mt-5">
        <label htmlFor="findUser">Username: </label>
        <input
          type="text"
          id="name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="find-username"
        />
      </div>
      <div>
        <button className="mt-5 mx-5" onClick={findUser}>
          Find User
        </button>

        <button className="mt-5 mx-5" onClick={deleteUser}>
          Delete User
        </button>
      </div>
    </div>
  );
}

export default Info;
