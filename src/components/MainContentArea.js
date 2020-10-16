import React from "react";
import styled from "styled-components";
import Chat from "./Chat/Chat";

const MainContentArea = () => {
    const loggedInUserId = 1;
    return (
        <StyledArea>
            <Chat userId = {loggedInUserId}/>
        </StyledArea>
    );
}

export default MainContentArea;

const StyledArea = styled.div`
    display: grid;
    // grid-template-columns: 1fr 1fr;
    padding: 20px;
    background: var(--app-background);
    overflow: auto;
    height: 100vh;
`;