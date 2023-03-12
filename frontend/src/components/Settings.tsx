import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

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
    const { user, isAuthenticated } = useAuth0();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [getUsers, setUsers] = useState([]);
    const [findResult, setFind] = useState<any[]>([]);


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

    return (

        <div className="mt-20 mb-10">
            <h1>Who am I?</h1>
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
                    Who am I?
                </button>
            </div>
        </div>

    );
}

export default Settings;