import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContentArea from "./components/MainContentArea";
import UserContext from "./contexts/UserContext";
import './App.css';


const App = () => {
    return(
        <Router>
            <UserContext>
                {/* <Route path="/" component={MainContentArea}/> */}
                <MainContentArea/>
            </UserContext>
        </Router>
    );
}

export default App;
