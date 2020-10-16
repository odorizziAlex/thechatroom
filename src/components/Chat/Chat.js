import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ConvList from "./ConvList";
import Messages from "./Messages";
import ConvContext from "../../contexts/ConvContext"
import MsgContext from "../../contexts/MsgContext"
import { UserContext } from "../../contexts/UserContext";

const Chat = ({userId}) => {
    const { users } = useContext(UserContext);
    const user = users.find((user) => user.userId === userId);
    const [ conversationIds, setConversationIds ] = useState(user.convIds);

    // useEffect(() => {
    //     console.log("userId:", userId);
    //     console.log("user:", user);
    // },[])

    return(
        <ConvContext>
            <MsgContext>
                <StyledArea>
                    <LeftArea>
                        <ConvList loggedInUser={user} convIds={conversationIds}/>
                    </LeftArea>
                    <RightArea>
                        <Messages/>
                    </RightArea>
                </StyledArea>
            </MsgContext>
        </ConvContext>
    );
}

export default Chat;

const StyledArea = styled.div`
    // overflow: auto;
    // height: 100vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    // border-bottom: 2px solid var(--dark-grey);
    `;
    
    const LeftArea = styled.div`
    border-radius: 10px;
    background: var(--trans-red);
    margin-right: 2px;
    `;
    const RightArea = styled.div`
    border-radius: 10px;
    background: var(--trans-blue);
    margin-left: 2px;
`;