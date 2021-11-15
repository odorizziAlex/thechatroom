import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'
import infoIconLight from '../../assets/alert-circle-petrol.svg'
import infoIconDark from '../../assets/alert-circle-green.svg'
import ChatHistory from './ChatHistory'
import AppHeader from '../AppHeader'
import LoginPopup from '../LoginPopup'
import ChatInput from '../ChatInput'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMessages, addMessage, deleteMessage, setMessagesLoading } from '../../actions/messageActions'
import PropTypes from 'prop-types'
import Config from '../../Config/Config'
import { v4 as uuidv4 } from 'uuid';


/**
 * TODO
 * 
 * https://www.youtube.com/watch?v=TO6akRGXhx8
 * 
 * 
 * prevent rerendering with usememo vs usecallback
 * 
 * create own IDs and drop mongodb ids!
 * --> pull once and update with sockets
 * 
 * create user authentication
 * save and restore chat history
 * present user list
 * show toast on leaving chat  
 * Animate:
 *  incoming messages
 *  hide popup
 *  scrolldown button show and hide
 *  scrolldown action
 * 
 */

const MainChat = (props) => {

    const [state, setState] = useState({ id: "", name: "", message: "", timestamp: "" }); 
    const [headerName, setHeaderName] = useState(""); 
    const { messages } = props.message;
    const [chat, setChat] = useState(messages);

    const [isUserNamePopupVisible, setIsUsernamePopupVisible] = useState(true); 
    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isNewMessageReceived, setIsNewMessageReceived] = useState(false);

    const socketRef = useRef();
    const messageListRef = useRef();

    useEffect(() => {
        let msgListRef = messageListRef.current;
        msgListRef.addEventListener("scroll", checkScrollDistance);

        props.getMessages()
        
        return () => {
            msgListRef.removeEventListener("scroll", checkScrollDistance);
        }
    }, [])

    useEffect(() => {
        if(chat.length === 0){
            setChat(messages)
        }
    }, [messages])

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:5000")
        socketRef.current.on('message', ({ id, name, message, timestamp }) => {
            setChat([...chat, { id, name, message, timestamp }])
            scrollHandler();
        });

        socketRef.current.on('userConnected', (name) => {
            notifyOnUserJoined(name);
        });

        socketRef.current.on('messageDeleted', (id) => {
            let updatedChat = chat.map(message =>{
                     if(message.id === id){
                        message.message = Config.MESSAGE_DELETED_STRING
                    }
                    return message
                });
            setChat(updatedChat);
        })

        return () => {
            socketRef.current.disconnect();
        }
    }, [chat, userHasScrolled, isNewMessageReceived, isDarkTheme])

    const notifyOnUserJoined = (name) => {
        toast([<strong key="1">{name} &nbsp;</strong>, <strong key="2" style={{ color: "var(--success)" }}>joined &nbsp;</strong>, ' the chat!'], {
            icon: <img src={isDarkTheme ? infoIconDark : infoIconLight} alt="info icon from feathericons.com"/>,
            style: {
                background: "var(--chat-background)",
                color: "var(--color-accent-light)"
            }
        });
    }
    // not yet in use.
    const notifyOnUserLeave = (name) => {
        toast([<strong key="1">{name} &nbsp;</strong>, <strong key="2" style={{ color: "var(--warning)" }}>left &nbsp;</strong>, ' the chat!'], {
            icon: <img src={isDarkTheme ? infoIconDark : infoIconLight} alt="info icon from feathericons.com" />,
            style: {
                background: "var(--chat-background)",
                color: "var(--color-accent-light)"
            }
        });
    }

    /**
     * Handles the appearence of the 'scroll down'-button and it's 'new message received'-indicator
     *  or jumps to the newest message. 
     */
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

    /**
     * This function determines whether the user has scrolled up a certain distance and changes the
     *  corresponding states.
     */
    const checkScrollDistance = () => {
        /**
         * .scrollHeight is the overall height of the div, that can be accessed by scrolling
         * .offsetHeight is the height of the displayed portion of a scrollable div
         * .scrollTop gets or sets the number of pixels that an element's content is scrolled vertically
         */
        let scrollDistance = messageListRef.current.scrollHeight - (messageListRef.current.scrollTop + messageListRef.current.offsetHeight);
        let messageListElHeight = messageListRef.current.offsetHeight;
        if (scrollDistance > (messageListElHeight / 4))
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
        const {name, message, timestamp } = state;

        event.preventDefault();

        if (state.message !== "") {
            // add message via action to state
            props.addMessage(socketRef, {id: uuidv4(), name, message, timestamp });

            // send message via socket
            setState({ id: "", name, message: "", timestamp: "" });
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

    const onDeleteClick = (id) => {
        props.deleteMessage(socketRef, id);
    }

    return (
        <StyledArea>
            <LoginPopup 
                state={state}
                isUserNamePopupVisible={isUserNamePopupVisible}
                onUsernameSubmit={onUsernameSubmit}
                onTextInputChange={onTextInputChange}
                isDarkTheme={isDarkTheme}
            />
            <ChatArea>
                <Toaster />
                <AppHeader 
                    headerName={headerName}
                    isDarkTheme={isDarkTheme}
                    setIsDarkTheme={setIsDarkTheme}
                />
                <ChatHistory 
                    state={state}
                    isDarkTheme={isDarkTheme}
                    onDeleteClick={onDeleteClick}
                    messageListRef={messageListRef}
                    chat={chat}
                />
                <ChatInput 
                    state={state}
                    isNewMessageReceived={isNewMessageReceived}
                    userHasScrolled={userHasScrolled}
                    scrollToNewestMessage={scrollToNewestMessage}
                    onTextInputChange={onTextInputChange}
                    isDarkTheme={isDarkTheme}
                    onMessageSubmit={onMessageSubmit}
                />
            </ChatArea>
        </StyledArea>
    );
}

MainChat.propTypes = {
    getMessages: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message
})

export default connect(mapStateToProps, { getMessages, addMessage, deleteMessage })(MainChat);

const StyledArea = styled.div`
position: fixed;
padding: 20px;
background: var(--global-background);
height: 100%;
width:100%;
`;

const ChatArea = styled.div`
position: absolute;
top:50%;
left:50%;
transform: translate(-50%, -50%);
display: flex;
flex-direction: column;
background: var(--chat-background);
border-radius: 10px;
width: 99%;
height: 98%;
`;