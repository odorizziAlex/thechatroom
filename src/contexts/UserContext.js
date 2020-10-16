import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {

    const [users, setUsers] = useState([
        {
            userId: 1,
            name: "User A",
            convIds: [1,2]
        },
        {
            userId: 2,
            name: "User B",
            convIds: [1]
        },
        {
            userId: 3,
            name: "User C",
            convIds: [1]
        }
    ]);

    return(
        <UserContext.Provider value={{users}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;