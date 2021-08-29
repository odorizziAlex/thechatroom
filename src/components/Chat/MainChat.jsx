import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import sendIconGrey from '../../assets/send_light-grey.svg'
import saveIconGrey from '../../assets/save_light-grey.svg'
import SingleMessage from './SingleMessage'
import io from 'socket.io-client'

const MainChat = () => {
    const [state, setState] = useState({name: "", message: "" });
    const [headerName, setHeaderName] = useState("");
    const [chat, setChat] = useState([]);
    const [isUserNamePopupVisible, setIsUsernamePopupVisible] = useState(true);

    const socketRef = useRef();

    /**
     * TODO
     * scrollable !check!
     * stack messages from bottom up
     * user created/ connected alert
     * scroll down button if scrolled elsewhere
     * stay scrolled down 
     */

    useEffect(()=> {
        socketRef.current = io.connect("http://localhost:5000")
        socketRef.current.on('message', ({ name, message }) => {
            console.log("state: ",state);
            console.log("chat: ",chat);
            setChat([ ...chat, { name, message } ])
        })
        socketRef.current.on('userDisconnected', () => {
            console.log("user disconnected");
        })
        return () => socketRef.current.disconnect()
    },
    [ chat ])

    const onUsernameSubmit = (event) => {
        event.preventDefault();
        if(state.name !== ""){
            setState({...state, [event.target.name]: event.target.value});
            setIsUsernamePopupVisible(false);
            setHeaderName(state.name);
        }
    }

    const onMessageSubmit = (event) => {
        const { name, message } = state;
        event.preventDefault();
        if(state.message !== ""){
            socketRef.current.emit('message', {name, message});
            setState({message: "", name });
        }
    }

    const onTextInputChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    return (
        <StyledArea>
            {isUserNamePopupVisible && <Overlay>
                <Popup>
                    <PopupDescription>
                        Insert your Username!
                    </PopupDescription>
                    <InputForm onSubmit={onUsernameSubmit}>
                        <StyledInput
                            name="name"
                            onChange={onTextInputChange}
                            value={state.name}
                            placeholder="Username..."
                            autoComplete="off"
                        />
                        <StyledButton text={state.name}>
                            <img src={saveIconGrey} alt="save icon from feathericons.com" />
                        </StyledButton>
                    </InputForm>
                </Popup>
            </Overlay>}
            <ChatArea>
                <HeaderWrapper>
                    <Header>
                        {headerName}
                    </Header>
                </HeaderWrapper>
                    <Messages>
                        {chat.map(({name, message}, index) => {
                            return(
                                <SingleMessage 
                                    key={index}
                                    currentUsername={state.name}
                                    name={name}
                                    message={message}
                                    />
                                    );
                                })}
                    </Messages>
                {/* <StyledButton onClick={() => { console.log("scroll"); }}>Scroll</StyledButton> */}
                <InputForm onSubmit={onMessageSubmit}>
                        <StyledInput
                            name="message"
                            onChange={onTextInputChange}
                            value={state.message}
                            placeholder="Message..."
                            autoComplete="off"
                        />
                        <StyledButton text={state.message}>
                            <img src={sendIconGrey} alt="send icon from feathericons.com" />
                        </StyledButton>
                </InputForm>
            </ChatArea>
        </StyledArea>
    );
}

export default MainChat;

const StyledArea = styled.div`
position: fixed;
padding: 20px;
background: var(--app-background);
height: 100%;
width:100%;
`;

const Overlay = styled.div`
background: var(--trans-black);
position: fixed;
width: 100%;
height: 100%;
// filter: blur (8px);
// -webkit-filter: blur (8px);
backdrop-filter: blur(5px);
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 2;
`

const Popup = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: var(--white);
border-radius: 10px;
`

const PopupDescription = styled.div`
text-align:center;
padding-top: 10px;
padding-bottom: 10px;

`
const ChatArea = styled.div`
position: absolute;
top:50%;
left:50%;
transform: translate(-50%, -50%);
display: flex;
flex-direction: column;
background: var(--white);
border-radius: 10px;
// min-height: 500px;
// max-height: 98%;
// max-width: 98%;
width: 98%;
height: 98%;
`;

const HeaderWrapper = styled.div`
padding: 10px;
border-bottom: 1px solid var(--light-grey);
`

const Header = styled.div`
display: flex;
width: 100%;
padding: 10px;
margin-top: auto;
background: var(--light-grey);
border-radius: 10px;
padding: 15px;
color: var(--petrol);
font-weight: 700;
`

const Messages = styled.div`
overflow-y: auto;
display: inline-block;
padding: 10px 10px 0px 10px;
// height: 100%;
width: 100%;
`

const InputForm = styled.form`
display: flex;
width: 100%;
padding: 10px;
margin-top: auto;
border-top: 1px solid var(--light-grey);
`

const StyledInput = styled.input`
border-radius: 10px;
border: 0;
background: var(--light-grey);
padding: 20px;
width: 100%;

&:focus {
    outline: none;
}
`

const StyledButton = styled.button`
border: 0;
padding: 4px 16px 0px 15px;
margin-left: 5px;
background: ${(props) => props.text !== "" ? "var(--petrol-light)" : "var(--dark-grey)"};
border-radius: 10px;
cursor: pointer;
cursor: ${(props) => props.text !== "" ? "pointer" : "default"};
pointer-events: ${(props) => props.text !== "" ? "" : "none"};   

&:hover {
    background: ${(props) => props.text !== "" ? "var(--petrol)" : ""};
}
`
