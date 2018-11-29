import React, {Component} from 'react';

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
      </footer>
    );
  }
}

export default ChatBar;