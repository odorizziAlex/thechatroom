import React from "react";
import styled from "styled-components";
import SingleMessage from './SingleMessage'

const ChatHistory = ({ state, isDarkTheme, onDeleteClick, messageListRef, chat }) => {
    
    return (
        <MessagesOutterWrapper ref={messageListRef}>
            <Messages>
                {chat.map(({ id, name, message, timestamp }) => {
                    return (
                        <SingleMessage
                            key={id}
                            id={id}
                            currentUsername={state.name}
                            name={name}
                            message={message}
                            timestamp={timestamp}
                            isDarkTheme={isDarkTheme}
                            clickFunction={onDeleteClick}
                        />
                    );
                })}
            </Messages>
        </MessagesOutterWrapper>
    )
}

export default ChatHistory;

const MessagesOutterWrapper = styled.div`
overflow-y: auto;
padding: 10px 10px 0px 10px;
height: 100%;
width: 100%;
`

const Messages = styled.div`
`