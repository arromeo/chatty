import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    let handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        this.props.newMessage(event);
        event.target.value = '';
      }
    }

    return (
      <footer className="chatbar">
        <input onChange={ (event) => this.props.onUserChange(event) } className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name}/>
        <input className="chatbar-message" onKeyPress={ handleKeyPress } />
      </footer>
    );
  }
}

export default ChatBar;