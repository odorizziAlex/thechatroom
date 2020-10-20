import React, { createContext, useState } from "react";

export const Config = createContext();

const ConfigProvider = props => {

    const [ config ] = useState({
        cookieUserKey: 'user',
    })

    return(
        <Config.Provider value={{ config }}>
            {props.children}
        </Config.Provider>
    )
}

export default ConfigProvider;