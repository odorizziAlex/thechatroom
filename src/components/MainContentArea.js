import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Chat from "./Chat/Chat";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../contexts/UserContext";
import { CookieManager } from "../cookies/CookieManager";
import { Config } from "../config/Config";

import io from "socket.io-client";
const socket = io('http://localhost:5000/', {secure:true, transports: ["polling" ]});


const MainContentArea = () => {
    const { config } = useContext(Config);
    const {users, addUserToDB, getUserByName, deleteUser} = useContext(UserContext);
    const { setUserCreatedCookie, getCookieByKey, deleteCookieByKey } = useContext(CookieManager);
    const [newUserName, setNewUserName] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isShowPopup, setIsShowPopup] = useState(true);
    const [usernameIsTooShort, setUsernameIsTooShort] = useState(false);
    
    useEffect(() => {
        socket.on("new-user-joined", data => {
            console.log("Got changes: ", data);
        })
    }, []);

    useEffect(() => {
        // console.log("mount");
        if(getCookieByKey(config.cookieUserKey) !== undefined){
            // console.log("current User name:",getCookieByKey(config.cookieUserKey));
            // save cookie on reload or leaving the page for about 1h
            // when user comes back in time load user from cookie again and delete cookie
            // when user doesn't come back in time, delete cookie and user.

        }else if(!isShowPopup){
            let currUsr = getUserByName(newUserName);
            setCurrentUser(currUsr);
            // setUserCreatedCookie(currUsr);
            socket.emit("new-user-created", currUsr);
        }
    },[users]);

    window.addEventListener("beforeunload", () => {
        if(currentUser !== undefined){
            deleteCookieByKey(currentUser.username);
            deleteUser(currentUser);
        }
    });

    const handleUserNameInputChange = (e) => {
        setNewUserName(e.target.value);
    }
    
    const onUserNameSubmit = (e) => {
        e.preventDefault();
        if(newUserName.length < 3){
            setUsernameIsTooShort(true);
        }else{
            let newUsr = {
                customId:uuidv4(),
                username:newUserName,
            }
            addUserToDB(newUsr);
            setIsShowPopup(false);
        }
    }

    return (
        <StyledArea>
            {isShowPopup && 
            <>
                <Overlay/>
                <Popup>
                        <PopupDescription>
                            The User you're about to create will only exist as long as you stay on this page.
                            If you leave, or reload the page your user will be deleted.
                        </PopupDescription>
                    <FormWrapper>
                        <StyledInput
                            type="text"
                            value={newUserName}
                            onChange={handleUserNameInputChange}
                            placeholder="Pick a Username..."
                        />

                        {newUserName !== "" && 
                        <StyledButton 
                            onClick={onUserNameSubmit}
                        >
                            Create User.
                        </StyledButton>}
                    </FormWrapper>
                    {usernameIsTooShort && 
                        <Warning>The Username has to have at least 3 characters.</Warning>
                    }
                </Popup>
            </>
            }
            <Chat user = {currentUser}/>
        </StyledArea>
    );
}

export default MainContentArea;

const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
`;

const Popup = styled.div`
// display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: var(--dark-grey);
    border-radius: 10px;
    float: left;
    box-sizing: border-box;
    border: 2px var(--dark-grey);
    transition: all 0.2s;
    z-index: 3;
`;

const PopupDescription = styled.div`
    font-size: 13px;
    text-align: center;
    color: var(--black);
    padding-bottom: 20px;
    font-weight: bold;
`;

const StyledButton = styled.button`
    display: flex;
    text-decoration: none;
    justify-content: center;
    padding: 10px 20px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    // margin-top: 10px;
    // margin-right: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const FormWrapper = styled.form`
    display: flex;
`;

const StyledInput = styled.input`
    border: 0;
    border-radius: 6px;
    display: block;
    width: 100%;
    padding: 20px;
    // font-size: 15px;
    font-size: 1rem;
    margin-right: 4px;
    color: var(--black);
    background: var(--light-grey);
`;

const StyledArea = styled.div`
    display: grid;
    // grid-template-columns: 1fr 1fr;
    padding: 20px;
    background: var(--app-background);
    overflow: auto;
    height: 100vh;
`;

const Warning = styled.div`
    font-size: 13px;
    color: var(--warning);
    text-align: center;
    font-weight: bold;
    padding-top: 20px;
`;