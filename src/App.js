import React from 'react';
import MainContentArea from "./components/MainContentArea";
import UserContext from "./contexts/UserContext";
import './App.css';

const App = () => {
    return(
        <UserContext>
            <MainContentArea/>
        </UserContext>
    );
}

export default App;
