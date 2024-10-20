import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageBar from './MessageBar';
import MessageArea from './MessageArea';

function App() {
    const [message, setMessage] = useState("Добрый день, как я могу Вам помочь?");
    console.log("App.js");
    return (
      <div id="body">
          <div className='dialog-window'>
              <MessageArea message={message}/>
              <MessageBar setMessage={setMessage}/>
          </div>
      </div>
    );
}

export default App;
