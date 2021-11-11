import React from 'react'
import styled from 'styled-components'
import sendIconLight from '../assets/send_light-grey.svg'
import sendIconDark from '../assets/send-dark.svg'
import downIconLight from '../assets/chevron-down_light-grey.svg'
import downIconDark from '../assets/chevron-down-dark.svg'

const ChatInput = ({state, isNewMessageReceived, userHasScrolled,scrollToNewestMessage, isDarkTheme, onMessageSubmit, onTextInputChange }) => {
    

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
         <BottomAreaWrapper>
            <ScrollButtonWrapper>
                {isNewMessageReceived && userHasScrolled &&
                    <NewMessageIndicator />}
                {userHasScrolled &&
                    <StyledScrollButton onClick={() => scrollToNewestMessage()}>
                        <img src={isDarkTheme ? downIconDark : downIconLight} alt="chevron down from feathericons.com" />
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
                    <img src={isDarkTheme ? sendIconDark : sendIconLight} alt="send icon from feathericons.com" />
                </StyledFormSubmitButton>
            </InputForm>
        </BottomAreaWrapper> 
    )
}

export default ChatInput

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
background: var(--color-accent-light);
border-radius: 10px;
cursor: pointer;

&:hover {
    background: var(--color-accent-dark);
}
`

const InputForm = styled.form`
display: flex;
width: 100%;
padding: 10px;
margin-top: auto;
border-top: 1px solid var(--structural-elements);
`

const StyledTextArea = styled.textarea`
border-radius: 10px;
overflow-y: auto;
border: 0;
background: var(--structural-elements);
padding: 20px;
width: 100%;
max-height: 55px;
font: var(--p-size) Arial;
resize: none;
color: var(--color-accent-dark);

&:focus {
    outline: none;
}
`

const StyledFormSubmitButton = styled.button`
border: 0;
padding: 4px 16px 0px 15px;
margin-left: 5px;
background: ${(props) => props.text !== "" ? "var(--color-accent-light)" : "var(--disabled-element)"};
border-radius: 10px;
cursor: pointer;
cursor: ${(props) => props.text !== "" ? "pointer" : "default"};
pointer-events: ${(props) => props.text !== "" ? "" : "none"};   

&:hover {
    background: ${(props) => props.text !== "" ? "var(--color-accent-dark)" : ""};
}
`

