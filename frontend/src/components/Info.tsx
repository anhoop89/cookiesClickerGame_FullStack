import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}
const api = axios.create({
    baseURL: `http://localhost:8080/`
})

function Info() {
    const { user, isAuthenticated } = useAuth0();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [getUsers, setUsers] = useState([]);
    const [findResult, setFind] = useState<any[]>([]);
    const [postResult, setPost] = useState<any[]>([]);
    const [deleteResult, setDelete] = useState<any[]>([]);

    // show data and hide data
    const [showData, setShowData] = useState(false);

    const getUsersButton = async () => {
        await api.get('/users')
            .then(res => {
                console.log(res.data);
                setUsers(res.data);
                setShowData(true);
            })
    };

    const postUser = async () => {
        await api.post('/users', {
            name: name,
            email: email,
            userClicks: 99,
            userUpgradeOne: 99,
            userUpgradeTwo: 99
          })
          .then((response) => {
            setPost(response.data);
            console.log(postResult);
          })
          .catch((error) => {
            console.error(error); // Or handle the error in another way
          });
      };

    // find user based on username. 
    const findUser = async () => {
        await api.get(`/user/${username}`)
          .then((response) => {
            console.log(response.data);
            setFind(response.data);
            console.log(findResult);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      

    // find user based on username. 
    const deleteUser = () => {
        api.delete(`/user/${username}`)
          .then(response => {
            setDelete(response.data);
            console.log(deleteResult);
            console.log(deleteResult.length);
            console.log(typeof deleteResult);
            
            const getUsersButton = () => {
              api.get('/users')
                .then(res => {
                  console.log(res.data);
                  setUsers(res.data);
                  setShowData(true);
                })
            };
          })
          .catch(error => {
            console.error(error); // Or handle the error in another way
          });
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
                    <input className="ml-2" type="text" value={name} onChange={(addName) => setName(addName.target.value)} />
                </label>
                <label className="mb-4">
                    Email:
                    <input className="ml-2" type="email" value={email} onChange={(addEmail) => setEmail(addEmail.target.value)} />
                </label>
                <button className="bg-blue-500 text-white hover:bg-blue-700" type='submit'>Add User</button>
            </form>

            <div className='mt-5'>
                <label htmlFor="username">Username: </label>
                <input type="text"
                    id="name"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    name="username"
                />
            </div>
            <div>
                <button className='mt-5 mx-5' onClick={findUser}>Find User</button>
                <button className='mt-5 mx-5' onClick={deleteUser}>Delete User</button>
            </div>


        </div>
    );
}
export default Info;



