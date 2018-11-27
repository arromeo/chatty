import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messages from '../data.json';

class App extends Component {
render() {
    return (
      <div>
        <MessageList messages={ messages }/>
        <ChatBar />
      </div>
    );
  }
}

export default App;
