import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}

function Info() {
    const { user, isAuthenticated } = useAuth0();
    const [getUsers, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    // show data and hide data
    const [showData, setShowData] = useState(false);

    const getUsersButton = async () => {
        const response = await axios.get('http://127.0.0.1:8080/users');
        setUsers(response.data);
        setShowData(true);
    };


    const postUser = async () => {
        try {
            const result = await axios.post('http://127.0.0.1:8080/users', {
                name: name,
                email: email,
                userClicks: 99,
                userUpgradeOne: 99,
                userUpgradeTwo: 99
            });
            if (result.status >= 200 && result.status < 300) {
                // Post request successful, do something here
                console.log("working!");
            } else {
                // Post request failed, display an error message
                alert('Failed to post data!');
            }
            setShowData(true);

        } catch (error) {
            console.error(error);
        }
    };

    // hide/show data
    const hideData = () => {
        setShowData(false);
        setUsers([]);
    }

    
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
                    <ul style={{ textAlign: 'left' }}>
                        {getUsers.map((user: any) => (
                            <li key={user.id}>
                                Name: {user.name} <br />&emsp; Email: {user.email}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <h1>POST Request!</h1>
            <form className='container flex flex-col pt-2 mt-3' onSubmit={postUser}>
                <label className="mb-4">
                    Name:
                    <input className="ml-2" type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label className="mb-4">
                    Email:
                    <input className="ml-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <button className="bg-blue-500 text-white hover:bg-blue-700" type='submit'>Add User</button>
            </form>
        </div>
    );
}
export default Info;

