import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ConvContext } from "../../contexts/ConvContext";
import { UserContext } from "../../contexts/UserContext";
import { MsgContext } from "../../contexts/MsgContext";


const ConvList = ({loggedInUser, convIds}) => {

    const { convs } = useContext(ConvContext);
    const { users } = useContext(UserContext);
    const { msgs } = useContext(MsgContext);

    const getConversations = () => {
        let convsList = [];
        for(let i=0;i<convIds.length;i++){
            let previewInformation = {
                convPartnerName: "",
                msgPreview: "",
            }
            if(convs[i].conversationId === convIds[i]){

                // get conversation Partner Name
                if(convs[i].ids.id1 !== loggedInUser.userId){
                    let convPartner = users.find((user) => user.userId === convs[i].ids.id1);
                    previewInformation.convPartnerName = convPartner.name;
                    
                }else{
                    let convPartner = users.find((user) => user.userId === convs[i].ids.id2);
                    previewInformation.convPartnerName = convPartner.name;

                }
                // get last message
                let msg = msgs.find((msg) => convs[i].messagesId === msg.msgId);
                previewInformation.msgPreview = msg.messages[msg.messages.length-1].text;
            }
            convsList.push(previewInformation);
        }

        return convsList;
    }

    const [conversationList, setConversationList] = useState(getConversations()); 
    
    

    useEffect(()=>{
        console.log(loggedInUser.userId);
        console.log(conversationList);
    },[]);

    return(
        <StyledArea>
            <UserList> 
                {conversationList.map((c) => (
                <UserItem>
                    <MessageTitle>{c.convPartnerName}</MessageTitle>
                    <MessagePreview>{c.msgPreview}</MessagePreview>
                </UserItem>
                ))}
            </UserList>
        </StyledArea>
    );
}

export default ConvList;

const StyledArea = styled.div`
    padding: 10px;
`;

const UserList = styled.ul`
    padding-left: 0;
`;

const UserItem = styled.div`
    // display: flex;
    // display: grid;
    // grid-template-columns: 6fr 1fr;
    // align-items: center;
    list-style-type: none;
    text-decoration: none;
    background: ${(props) => (props.selected ? "var(--trans-white-60)" : "var(--trans-white-20)")};
    border-radius: 10px;
    transition: all 0.2s;
    padding: 10px;
    cursor: pointer;

    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const MessageTitle = styled.div`
    font-weight: bold;
    font-size: var(--h2-size);
`;

const MessagePreview = styled.div`
    font-size: var(--p-size);
`;