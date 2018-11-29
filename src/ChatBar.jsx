import React, {Component} from 'react';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/apple.json';
import { NimblePicker } from 'emoji-mart';

class ChatBar extends Component {

  render() {
    // Submits the message to be sent to the server and broadcast.
    let handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        this.props.newMessage(event);
        event.target.value = '';
      }
    }

    // Submits name change when 'Enter' key is pressed.
    let submitUserChangeKey = (event) => {
      if(event.key == 'Enter'){
        this.props.onUserChange(event);
      }
    }

    // Submits name change when name field is blurred.
    let submitUserChangeBlur = (event) => {
        this.props.onUserChange(event);
    }

    return (
      <footer className="chatbar">
        <input
          onChange={ (event) => this.props.changeName(event) }
          onBlur={ submitUserChangeBlur }
          onKeyPress={ submitUserChangeKey }
          className="chatbar-username"
          value={this.props.currentUser.name} />
        <input 
          className="chatbar-message"
          onKeyPress={ handleKeyPress } />
        <NimblePicker set='apple' data={ data }/>
      </footer>
    );
  }
}

export default ChatBar;