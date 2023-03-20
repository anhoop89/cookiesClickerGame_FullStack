import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}
const api = axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {
        "Content-type": "application/json",
    },
});


function Settings() {
    const { user, isAuthenticated, logout } = useAuth0();
    const navigate = useNavigate();
    let username: string = "";
    let email: string = "";

    const [findResult, setFind] = useState<any[]>([]);
    const [deleteResult, setDelete] = useState<any[]>([]);

    if (user?.email_verified === true) {
        username = user.nickname;
        email = user.email;
    }

    const findUser = async () => {
        await api
            .get(`/user/${username}`)
            .then((response) => {
                console.log(response.data);
                setFind(response.data);
                console.log(findResult);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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


        logout();
        alert("Your account has been deleted!")
        setTimeout(() => {
            navigate("/");
        }, 4000);
        console.log(username);
    };



    // making a check to see if user has logged into an account or not
    // if they have, the settings page displaying information will appear
    if (user?.email_verified === true) {
        return (
            <div className="container mt-20 mb-10 ">
                <br></br>
                <h1 className="readFont pt-20">Who am I?</h1>

                <div className="readFont text-center mx-auto rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="block mb-3">
                        User Name:
                    </h2>
                    <p className=" block">
                        {username}
                    </p>
                </div>

                <div className="readFont text-center mx-auto rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="block mb-3">
                        Email:
                    </h2>
                    <p className=" block">
                        {email}
                    </p>
                </div>

                <div>
                    <button className="mt-5 mx-5" onClick={deleteUser}>
                        Delete Account!
                    </button>
                </div>


            </div>

        );
    }
    // if the user has not logged in properly, they will only see a message
    //      telling them they need to login
    else {
        return (
            <div className="mt-20 mb-10">
                <h1 className="readFont">Please log in to continue</h1>
            </div>
        );
    }
}

export default Settings;