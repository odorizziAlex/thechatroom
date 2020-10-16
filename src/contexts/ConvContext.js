import React, { createContext, useState } from "react";

export const ConvContext = createContext();

const ConvContextProvider = props => {

    const [convs, setConvs] = useState([
        {
            conversationId: 1,
            ids: {id1: 1, id2: 2},
            messagesId: 1
        },
        {
            conversationId: 2,
            ids: {id1: 3, id2: 1},
            messagesId: 2
        },
        {
            conversationId: 3,
            ids: {id1: 3, id2: 4},
            messagesId: 2
        }
    ]);

    return(
        <ConvContext.Provider value={{convs}}>
            {props.children}
        </ConvContext.Provider>
    )
}

export default ConvContextProvider;