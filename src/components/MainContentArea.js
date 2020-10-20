import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Chat from "./Chat/Chat";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../contexts/UserContext";


const MainContentArea = () => {
    const loggedInUserId = 0;
    const {users, addUserToDB, getUserByName} = useContext(UserContext);
    const [newUserName, setNewUserName] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isShowPopup, setIsShowPopup] = useState(true);
    const [usernameIsTooShort, setUsernameIsTooShort] = useState(false);
    
    useEffect(() => {
        if(!isShowPopup){
            setCurrentUser(getUserByName(newUserName));
            // console.log(currentUser);
        }
    },[users]);

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
                    <FormWrapper>
                        <StyledInput
                            type="text"
                            value={newUserName}
                            onChange={handleUserNameInputChange}
                            placeholder="Pick a Username..."
                        />

                        {newUserName !== "" && 
                        <StyledButton 
                        //onsubmit ???
                            onClick={onUserNameSubmit}
                        >
                            Create. User.
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
    font-weight: bold;
    padding-top: 20px;
`;