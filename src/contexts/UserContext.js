import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


export const UserContext = createContext();

const UserContextProvider = props => {

    const [users, setUsers] = useState();

    const updateUsers = (newUser) => {
        const updatedList = [...users, newUser];
        setUsers(updatedList);
    }

    async function loadUsers() {
        const response = await axios.get("http://localhost:5000/users/");
        if(response.status !== 200){
            console.log("Error reloading");
        }
        setUsers(response.data);
    }

    useEffect(() => {
        loadUsers();
    },[]);

    const addUserToDB = async (newUsr) => {
        await axios.post('http://localhost:5000/users/add', newUsr)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log("error while adding: "+err);
        });
        loadUsers();
    }

    const getUserByName = (username) => {
            let currentUser = users.find((user) => user.username === username);
            return currentUser;
    }

    const deleteUser = async (user) => {
        if(user !== undefined){
            await axios.delete(`http://localhost:5000/users/${user._id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log("error while deleting: "+ err));
            setUsers(users.filter(el => el._id !== user._id));
        }
    }
    
    return(
        <UserContext.Provider value={{users, updateUsers, addUserToDB, getUserByName, deleteUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;