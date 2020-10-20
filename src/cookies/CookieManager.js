import React, { createContext, useState } from "react";
import Cookies from 'js-cookie';

export const CookieManager = createContext();

const CookieManagerProvider = props => {

    const setUserCreatedCookie = (user) => {
        //day cookie:
        // Cookies.set('user', user, { expires: 1 });
        //testing 10 min cookie
        let thirtySec = new Date(new Date().getTime() + 3*1000);
        Cookies.set('user', user.username, { expires: thirtySec });
        let cookie = Cookies.get('user');
        console.log(cookie);
    }

    const getCookieByKey = (key) => {
        return Cookies.get(key);
    }

    const deleteCookieByKey = (key) => {
        Cookies.remove(key);
    }

    return(
        <CookieManager.Provider value={{ setUserCreatedCookie, getCookieByKey, deleteCookieByKey }}>
            {props.children}
        </CookieManager.Provider>
    )
}

export default CookieManagerProvider;