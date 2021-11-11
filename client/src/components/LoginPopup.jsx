import React from 'react'
import styled from 'styled-components'
import saveIconLight from '../assets/save_light-grey.svg'
import saveIconDark from '../assets/save-dark.svg'

const LoginPopup = ({state, isUserNamePopupVisible, onUsernameSubmit, onTextInputChange, isDarkTheme}) => {

    return(
        <div>
            {isUserNamePopupVisible && 
                <Overlay>
                    <Popup>
                        <PopupHeaderWrapper>
                            <PopupDescription>
                                Insert your Username!
                            </PopupDescription>
                        </PopupHeaderWrapper>
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
                                <img src={isDarkTheme ? saveIconDark : saveIconLight} alt="save icon from feathericons.com" />
                            </StyledFormSubmitButton>
                        </InputForm>
                    </Popup>
                </Overlay>
            }
        </div>
    )
}

export default LoginPopup;

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
background: var(--chat-background);
border-radius: 10px;
`

const PopupHeaderWrapper = styled.div`
display: flex;
padding: 10px;
justify-content: center;
`

const PopupDescription = styled.div`
text-align:center;
padding-top: 4px;
color: var(--color-accent-light);
font-weight: 700;
`

const InputForm = styled.form`
display: flex;
width: 100%;
padding: 10px;
margin-top: auto;
border-top: 1px solid var(--structural-elements);
`

const StyledInput = styled.input`
border-radius: 10px;
border: 0;
background: var(--structural-elements);
padding: 20px;
width: 100%;
color: var(--color-accent-dark);
font: var(--p-size) Arial;


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