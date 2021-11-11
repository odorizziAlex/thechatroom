import React from 'react'
import styled from 'styled-components'
import deleteIconOwnLightTheme from '../../assets/x-Light-Own.svg';
import deleteIconOwnDarkTheme from '../../assets/x-Dark-Own.svg';

/**
 * refactor date formatting and timestamps.
 * Maybe use date.now instead and format.
 */

const SingleMessage = ({id, currentUsername, name, message, timestamp, isDarkTheme, clickFunction}) => {

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
        if(parseInt(dateList[0],10) === today.getDate() && parseInt(dateList[1],10) === (today.getMonth()+1) && parseInt(dateList[2],10) === today.getFullYear())
            return "today";
        else if(date === yesterday)
            return "yesterday";
        else return date.replaceAll('/', '.');
    }

    return (
        <OutterWrapper isOwnMessage={currentUsername === name}>
                <SingleMessageWrapper isOwnMessage={currentUsername === name}>
                    <HeaderWrapper isOwnMessage={currentUsername === name}>
                        <StyledUsername isOwnMessage={currentUsername === name}>{name}</StyledUsername>
                        <IconWrapper>
                            {currentUsername === name &&
                                <StyledDeleteIcon 
                                    src={
                                        isDarkTheme ? deleteIconOwnDarkTheme : deleteIconOwnLightTheme
                                    } 
                                    alt="x Icon from feathericons.com" 
                                    isOwnMessage={currentUsername === name} 
                                    onClick={() => {currentUsername === name && clickFunction(id)}}    
                                /> 
                            }
                            {/* <TooltipDelete>Delete message?</TooltipDelete> */}
                        </IconWrapper>
                    </HeaderWrapper>
                    <StyledText isOwnMessage={currentUsername === name}>{message}</StyledText>
                    <StyledTimestamp isOwnMessage={currentUsername === name}>{formatDate()}</StyledTimestamp>
                </SingleMessageWrapper>
        </OutterWrapper>
    )
};

export default SingleMessage;

const OutterWrapper = styled.div`
display: block;
text-align: ${props => props.isOwnMessage ? "right" : "left"};
`

const SingleMessageWrapper = styled.div`
display: inline-block;
border-radius: 10px;
padding: 10px;
max-width: 75%;
margin-bottom: 10px;
background: ${props => props.isOwnMessage ? "var(--color-accent-light)" : "var(--structural-elements)"};
color: ${props => props.isOwnMessage ? "var(--structural-elements)" : "var(--color-accent-light)"};
`

const HeaderWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: ${props => props.isOwnMessage ? "0px" : "5px"} ;
`

const StyledUsername = styled.div`
font-size: 15px;
font-weight: 750;
opacity: ${props => props.isOwnMessage ? "0" : "1"};
`

const IconWrapper = styled.div`
text-align: ${props => props.isOwnMessage ? "" : "right"};

`
const StyledDeleteIcon = styled.img`
width: var(--p-size);
cursor: pointer;
`

// const TooltipDelete = styled.div`
// position: absolute;
// text-align: left;
// display: inline-block;
// font-size: var(--p-small-size);
// width: 93px;
// background: var(--color-accent-light);
// color: var(--structural-elements);
// padding: 5px;
// margin-top: 5px;
// border-radius: 5px;
// // opacity: 0;
// // transform: scaleY(0);
// // transform-origin: top;
// // transition: all 0.1s;
// // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);

// // ${StyledDeleteIcon}:hover & {
// //     opacity: 1;
// //     transform: scaleY(1);
// // }
// `;

const StyledText = styled.div`
font-size: var(--p-size);
overflow-wrap: break-word;
white-space: pre-wrap;
text-align: left;
margin-right:${props => props.isOwnMessage ? "10px":"0px"} ;
`

const StyledTimestamp = styled.div`
font-size: var(--p-small-size);
margin-top: 5px;
text-align: ${props => props.isOwnMessage ? "right" : "left"} ;
color: ${props => props.isOwnMessage ? "var(--structural-elements)" : "var(--color-accent-light)"} ;
`

