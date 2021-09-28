import React from 'react'
import styled from 'styled-components'

/**
 * refactor date formatting and timestamps.
 * Maybe use date.now instead and format.
 */

const SingleMessage = ({currentUsername, name, message, timestamp}) => {

    const formatDate = () => {
        let tmstmp = timestamp.split(',');
        let date = tmstmp[0];
        let time = tmstmp[1].split(':');
        date = isToday(date);
        let newTimestamp = date+" "+time[0]+':'+time[1];
        return newTimestamp;
    }

    const isToday = (date) => {
        let today = new Date();
        let dateList = date.split('/');
        let yesterday = new Date((new Date()).valueOf() - 1000*60*60*24).toLocaleString().split(',')[0];
        if(parseInt(dateList[0]) === today.getDate() && parseInt(dateList[1]) === (today.getMonth()+1) && parseInt(dateList[2]) === today.getFullYear())
            return "today";
        else if(date === yesterday)
            return "yesterday";
        else return date.replaceAll('/', '.');
    }

    return (
        <OutterWrapper isOwnMessage={currentUsername === name}>
                <SingleMessageWrapper isOwnMessage={currentUsername === name}>
                    <StyledUsername isOwnMessage={currentUsername === name}>{name}</StyledUsername>
                    <StyledText>{message}</StyledText>
                    <StyledTimestamp isOwnMessage={currentUsername === name}>{formatDate()}</StyledTimestamp>
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
background: ${(props) => props.isOwnMessage ? "var(--color-accent-light)" : "var(--structural-elements)"};
color: ${(props) => props.isOwnMessage ? "var(--structural-elements)" : "var(--color-accent-light)"};
`

const StyledUsername = styled.div`
font-size: 15px;
font-weight: 750;
margin-bottom: 5px;
display: ${(props) => props.isOwnMessage ? "none" : ""};
`

const StyledText = styled.div`
font-size: var(--p-size);
overflow-wrap: break-word;
white-space: pre-wrap;
text-align: left;
`

const StyledTimestamp = styled.div`
font-size: var(--p-small-size);
margin-top: 5px;
text-align: ${(props) => props.isOwnMessage ? "right" : "left"} ;
color: ${(props) => props.isOwnMessage ? "var(--structural-elements)" : "var(--color-accent-light)"} ;
`