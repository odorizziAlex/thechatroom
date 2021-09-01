import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import sendIconGrey from '../../assets/send_light-grey.svg'
import saveIconGrey from '../../assets/save_light-grey.svg'
import downIconGrey from '../../assets/chevron-down_light-grey.svg'
import SingleMessage from './SingleMessage'
import io from 'socket.io-client'

/**
 * TODO
 * stack messages from bottom up !discarted!
 * make message input box multiline !check!
 *
 * username input maximum letters, !!no space!! linebreak when too narrow!!
 * user created/ connected alert
 * present user list
 * save history and save users + pw
 */

const MainChat = () => {
    const [state, setState] = useState({ name: "", message: "" });
    const [headerName, setHeaderName] = useState("");
    const [chat, setChat] = useState([]);
    const [isUserNamePopupVisible, setIsUsernamePopupVisible] = useState(true);
    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const [isNewMessageReceived, setIsNewMessageReceived] = useState(false);

    const socketRef = useRef();
    const messageListRef = useRef();


    useEffect(() => {
        let msgListRef = messageListRef.current;
        msgListRef.addEventListener("scroll", checkScrollDistance);

        socketRef.current = io.connect("http://localhost:5000")
        socketRef.current.on('message', ({ name, message }) => {
            // console.log("state: ",state);
            // console.log("chat: ",chat);
            setChat([...chat, { name, message }])
            scrollHandler();
        })

        // socketRef.current.on('userDisconnected', () => {
        //     console.log("user disconnected");
        // })
        return () => {
            socketRef.current.disconnect();
            msgListRef.removeEventListener("scroll", checkScrollDistance);
        }
    },
        [chat, userHasScrolled, isNewMessageReceived])

    const scrollHandler = () => {
        if (!userHasScrolled) {
            scrollToNewestMessage();
        } else if (userHasScrolled) {
            setIsNewMessageReceived(true);
        }
    }

    const scrollToNewestMessage = () => {
        if (isNewMessageReceived) setIsNewMessageReceived(false);
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }

    const checkScrollDistance = () => {
        /**
         * .scrollHeight is the overall height of the div, that can be accessed by scrolling
         * .offsetHeight is the height of the displayed portion of a scrollable div
         * .scrollTop gets or sets the number of pixels that an element's content is scrolled vertically
         */
        let scrollDistance = messageListRef.current.scrollHeight - (messageListRef.current.scrollTop + messageListRef.current.offsetHeight);
        let messageListElHeight = messageListRef.current.offsetHeight;
        if (scrollDistance > (messageListElHeight / 4))
            setUserHasScrolled(true)
        else {
            setUserHasScrolled(false);
            setIsNewMessageReceived(false);
        }
    }

    const onUsernameSubmit = (event) => {
        event.preventDefault();
        if (state.name !== "") {
            setState({ ...state, [event.target.name]: event.target.name });
            setIsUsernamePopupVisible(false);
            setHeaderName(state.name);
        }
    }

    const onMessageSubmit = (event) => {
        const { name, message } = state;
        event.preventDefault();
        if (state.message !== "") {
            socketRef.current.emit('message', { name, message });
            setState({ message: "", name });
            scrollToNewestMessage();
        }
    }

    const onTextInputChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    /**
     * This handler is required to use enter as a submit option while using a
     *  textarea instead of a standard input in a form.
     */
    const onEnterPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onMessageSubmit(e);
        }
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
                            maxLength="25"
                        />
                        <StyledFormSubmitButton text={state.name}>
                            <img src={saveIconGrey} alt="save icon from feathericons.com" />
                        </StyledFormSubmitButton>
                    </InputForm>
                </Popup>
            </Overlay>}
            <ChatArea>
                <HeaderWrapper>
                    <Header>
                        {headerName}
                    </Header>
                </HeaderWrapper>
                <MessagesOutterWrapper ref={messageListRef}>
                    <Messages>
                        {chat.map(({ name, message }, index) => {
                            return (
                                <SingleMessage
                                    key={index}
                                    currentUsername={state.name}
                                    name={name}
                                    message={message}
                                />
                            );
                        })}
                    </Messages>
                </MessagesOutterWrapper>
                <BottomAreaWrapper>
                    <ScrollButtonWrapper>
                        {isNewMessageReceived && userHasScrolled &&
                            <NewMessageIndicator />}
                        {userHasScrolled &&
                            <StyledScrollButton onClick={() => scrollToNewestMessage()}>
                                <img src={downIconGrey} alt="chevron down from feathericons.com" />
                            </StyledScrollButton>}
                    </ScrollButtonWrapper>
                    <InputForm
                        onSubmit={onMessageSubmit}
                    >
                        <StyledTextArea
                            name="message"
                            onChange={onTextInputChange}
                            value={state.message}
                            placeholder="Message..."
                            autoComplete="off"
                            onKeyDown={onEnterPress}
                        />
                        <StyledFormSubmitButton text={state.message}>
                            <img src={sendIconGrey} alt="send icon from feathericons.com" />
                        </StyledFormSubmitButton>
                    </InputForm>
                </BottomAreaWrapper>
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

const MessagesOutterWrapper = styled.div`
overflow-y: auto;
padding: 10px 10px 0px 10px;
height: 100%;
width: 100%;
`

const Messages = styled.div`
`

const BottomAreaWrapper = styled.div`
`

const ScrollButtonWrapper = styled.div`
position: absolute;
margin-left: 10px;
margin-top: -40px;
z-index: 2;
`

const NewMessageIndicator = styled.div`
position: absolute;
pointer-events: none;
width: 13px;
height: 13px;
margin-left: 22px;
margin-top: -3px;
border-radius: 6px;
background: var(--warning);
`

const StyledScrollButton = styled.div`
display: inline-block;
border: 0;
padding: 4px 4px 0px 4px;
background: var(--petrol-light);
border-radius: 10px;
cursor: pointer;

&:hover {
    background: var(--petrol);
}
`

const InputForm = styled.form`
display: flex;
width: 100%;
padding: 10px;
margin-top: auto;
border-top: 1px solid var(--light-grey);
`

const StyledTextArea = styled.textarea`
border-radius: 10px;
overflow-y: auto;
border: 0;
background: var(--light-grey);
padding: 20px;
width: 100%;
max-height: 55px;
font: 13px Arial;
resize: none;

&:focus {
    outline: none;
}
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

const StyledFormSubmitButton = styled.button`
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
