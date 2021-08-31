import React from 'react'
import styled from 'styled-components'

const SingleMessage = ({currentUsername, name, message}) => {

    return (
        <OutterWrapper isOwnMessage={currentUsername === name}>
                <SingleMessageWrapper isOwnMessage={currentUsername === name}>
                    <StyledUsername isOwnMessage={currentUsername === name}>{name}</StyledUsername>
                    <StyledText isOwnMessage={currentUsername === name}>{message}</StyledText>
                </SingleMessageWrapper>
        </OutterWrapper>
    )
};

export default SingleMessage;

const OutterWrapper = styled.div`
display: block;
text-align: ${(props) => props.isOwnMessage ? "right" : "left"};
`

const SingleMessageWrapper = styled.div`
display: inline-block;
border-radius: 10px;
padding: 10px;
max-width: 75%;
margin-bottom: 10px;
background: ${(props) => props.isOwnMessage ? "var(--petrol-light)" : "var(--light-grey)"};
color: ${(props) => props.isOwnMessage ? "var(--light-grey)" : "var(--petrol-light)"};
`

const StyledUsername = styled.div`
font-size: 15px;
font-weight: 750;
margin-bottom: 5px
`

const StyledText = styled.div`
font-size: 13px;
overflow-wrap: break-word;
white-space: pre-wrap;
`