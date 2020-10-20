import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ConvContext } from "../../contexts/ConvContext";
import { UserContext } from "../../contexts/UserContext";
import { MsgContext } from "../../contexts/MsgContext";


const ConvList = ({user}) => {

    const { users, deleteUser } = useContext(UserContext);

    const logging = () => {
        if(user!==undefined){
            console.log(user);
            console.log(users);
        }
    }
    logging();
    return(
        <StyledArea>
            <UserList> 
                {/* {user !== undefined && <UserItem key={user._id}>
                    <MessageTitle>{user.username}</MessageTitle>
                    <MessagePreview>Preview</MessagePreview>
                </UserItem>} */}

                {users !== undefined && users.map((u) => (
                <UserItem key={u._id}>
                    <MessageTitle>{u.username}</MessageTitle>
                    <MessagePreview>preview</MessagePreview>
                </UserItem>
                ))}
            </UserList>
        </StyledArea>
    );
}

export default ConvList;

const StyledArea = styled.div`
    padding: 10px;
`;

const UserList = styled.ul`
    padding-left: 0;
`;

const UserItem = styled.div`
    // display: flex;
    // display: grid;
    // grid-template-columns: 6fr 1fr;
    // align-items: center;
    list-style-type: none;
    text-decoration: none;
    background: ${(props) => (props.selected ? "var(--trans-white-60)" : "var(--trans-white-20)")};
    border-radius: 10px;
    transition: all 0.2s;
    padding: 10px;
    cursor: pointer;

    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const MessageTitle = styled.div`
    font-weight: bold;
    font-size: var(--h2-size);
`;

const MessagePreview = styled.div`
    font-size: var(--p-size);
`;