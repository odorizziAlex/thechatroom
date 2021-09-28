import React from 'react'
import MainChat from './components/Chat/MainChat.jsx'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <MainChat/>
    </Provider>
  );
}

export default App;
