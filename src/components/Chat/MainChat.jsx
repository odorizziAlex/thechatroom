import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'
import sendIconGrey from '../../assets/send_light-grey.svg'
import saveIconGrey from '../../assets/save_light-grey.svg'
import downIconGrey from '../../assets/chevron-down_light-grey.svg'
import infoIconLightPetrol from '../../assets/info_light-petrol.svg'
import SingleMessage from './SingleMessage'
import io from 'socket.io-client'

/**
 * TODO
 * user left chat toast 
 *  // refactor setTimeout! when message changes multiple times during 3500ms
    // it wont stay for additional 3500 ms
    also figure out how to show username that loggs off.
 * 
 * present user list
 * save history and save users + pw
 */

const MainChat = () => {

    const [state, setState] = useState({ name: "", message: "", timestamp: "" });
    const [headerName, setHeaderName] = useState("");
    const [chat, setChat] = useState([]);

    const [isUserNamePopupVisible, setIsUsernamePopupVisible] = useState(true);
    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const [isNewMessageReceived, setIsNewMessageReceived] = useState(false);

    const socketRef = useRef();
    const messageListRef = useRef();


    useEffect(() => {
        socketRef.current = io.connect("http://localhost:5000")
        socketRef.current.on('message', ({ name, message, timestamp }) => {
            setChat([...chat, { name, message, timestamp }])
            scrollHandler();
        });

        socketRef.current.on('userConnected', (name) => {
            notifyOnUserJoined(name);
        });

        return () => {
            socketRef.current.disconnect();
        }
    }, [chat, userHasScrolled, isNewMessageReceived])

    useEffect(() => {
        let msgListRef = messageListRef.current;
        msgListRef.addEventListener("scroll", checkScrollDistance);

        return () => {
            msgListRef.removeEventListener("scroll", checkScrollDistance);
        }
    }, [])

    const notifyOnUserJoined = (name) => {
        toast([<strong key="1">{name} &nbsp;</strong>,<strong key="2" style={{color: "var(--success)"}}>joined &nbsp;</strong>,' the chat!'],{
            icon: <img src={infoIconLightPetrol} alt="info icon from feathericons.com" />
        });
    }
    // currently not in use.
    const notifyOnUserLeave = (name) => {
        toast([<strong key="1">{name} &nbsp;</strong>,<strong key="2" style={{color: "var(--warning)"}}>left &nbsp;</strong>,' the chat!'],{
            icon: <img src={infoIconLightPetrol} alt="info icon from feathericons.com" />
        });
    }

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
        if (scrollDistance > (messageListElHeight / 2))
            setUserHasScrolled(true);
        else {
            setUserHasScrolled(false);
            setIsNewMessageReceived(false);
        }
    }

    const onUsernameSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        if (state.name !== "") {
            socketRef.current.emit('userConnected', name);
            setState({ ...state, [event.target.name]: event.target.value });
            setIsUsernamePopupVisible(false);
            setHeaderName(state.name);
        }
    }

    const onMessageSubmit = (event) => {
        const { name, message, timestamp } = state;
        event.preventDefault();
        if (state.message !== "") {
            socketRef.current.emit('message', { name, message, timestamp });
            setState({ message: "", name, timestamp: "" });
            scrollToNewestMessage();
        }
    }

    const onTextInputChange = (event) => {
        if (event.target.name === "name") {
            let username = event.target.value;
            username = username.replace(/\s/g, '');
            setState({ ...state, [event.target.name]: username });
        } else {
            setState({ ...state, [event.target.name]: event.target.value, timestamp: new Date().toLocaleString() });
        }
    }

    /**
     * This handler is required to use enter as a submit option while using a
     *  textarea instead of a standard input in a form.
     */
    const onEnterPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            onMessageSubmit(event);
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
                <Toaster/>
                <HeaderWrapper>
                    <Header>
                        {headerName}
                    </Header>
                </HeaderWrapper>
                <MessagesOutterWrapper ref={messageListRef}>
                    <Messages>
                        {chat.map(({ name, message, timestamp }, index) => {
                            return (
                                <SingleMessage
                                    key={index}
                                    currentUsername={state.name}
                                    name={name}
                                    message={message}
                                    timestamp={timestamp}
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
width: 99%;
height: 98%;
`;

const HeaderWrapper = styled.div`
padding: 10px;
border-bottom: 1px solid var(--light-grey);
`

const Header = styled.div`
width: 100%;
background: var(--light-grey);
border-radius: 10px;
padding: 15px;
color: var(--petrol);
font-weight: 700;
text-align: right;
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
background: var(--light-petrol);
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
background: ${(props) => props.text !== "" ? "var(--light-petrol)" : "var(--dark-grey)"};
border-radius: 10px;
cursor: pointer;
cursor: ${(props) => props.text !== "" ? "pointer" : "default"};
pointer-events: ${(props) => props.text !== "" ? "" : "none"};   

&:hover {
    background: ${(props) => props.text !== "" ? "var(--petrol)" : ""};
}
`
