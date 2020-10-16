import React, { createContext, useState } from "react";

export const MsgContext = createContext();

const MsgContextProvider = props => {

    const [msgs, setMsgs] = useState([
        {
            msgId: 1,
            conversationId: 1,
            timeStamp:"2020-09-21T14:59:00+02:00",
            messages:[
            {
                id: 0,
                userId: 1,
                text: "Hi",
                timeStamp: "2020-09-21T14:59:00+02:00",
            },
            {
                id: 1,
                userId: 2,
                text: "Hi, whats up?",
                timeStamp: "2020-09-15:00:00+02:00",
            }
        ]
        },
        {
            msgId: 2,
            conversationId: 1,
            timeStamp:"2020-09-21T14:59:00+02:00",
            messages:[
            {
                id: 0,
                userId: 1,
                text: "iH",
                timeStamp: "2020-09-21T14:59:00+02:00",
            },
            {
                id: 1,
                userId: 3,
                text: "iH, stahw pu?",
                timeStamp: "2020-09-15:00:00+02:00",
            }
        ]
        },
    ]);

    return(
        <MsgContext.Provider value={{msgs}}>
            {props.children}
        </MsgContext.Provider>
    )
}

export default MsgContextProvider;