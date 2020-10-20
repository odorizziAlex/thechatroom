import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContentArea from "./components/MainContentArea";
import UserContext from "./contexts/UserContext";
import CookieManager from "./cookies/CookieManager";
import Config from "./config/Config";
import './App.css';


const App = () => {
    return(
        <Router>
            <Config>
                <CookieManager>
                    <UserContext>
                        {/* <Route path="/" component={MainContentArea}/> */}
                        <MainContentArea/>
                    </UserContext>
                </CookieManager>
            </Config>
        </Router>
    );
}

export default App;
