import React, {Component} from 'react';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/apple.json';
import { NimblePicker } from 'emoji-mart';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrin } from '@fortawesome/free-solid-svg-icons'

library.add(faGrin);

class EmojiPicker extends Component {

  // Event listener for emoji picker.
  constructor (props) {
    super(props);
    this.addEmoji = this.addEmoji.bind(this);
  }

  // Action sends emoji back up to chat bar when one is selected.
  addEmoji (event) {
    this.props.insertEmoji(event.native);
  }

  // Renders the emoji picker based on state handed down from chat bar.
  render() {
    return this.props.visible ? 
    (<NimblePicker style={{ position: 'absolute', bottom: '65px', right: '0px' }} onSelect={ this.addEmoji } set='apple' data={ data }/>) : null;
  }
}

class ChatBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      emojiPickerVisible: false
    }

    this.inputRef = null;

    this.setInputRef = element => {
      this.inputRef = element;
    };

    this.insertEmoji = this.insertEmoji.bind(this);
  }

  insertEmoji (nativeEmoji) {
    this.inputRef.value += nativeEmoji;
  }

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

    let emojiButtonClick = (event) => {
      this.setState({emojiPickerVisible: !this.state.emojiPickerVisible});
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
          ref={ this.setInputRef }
          className="chatbar-message"
          onKeyPress={ handleKeyPress }
          />
          <span className="emoji-icon" onClick={ emojiButtonClick }>
            <FontAwesomeIcon icon="grin" color="#8DA9C4" size='2x'></FontAwesomeIcon>
          </span>
          <EmojiPicker visible={ this.state.emojiPickerVisible } insertEmoji={ this.insertEmoji }/>
      </footer>
    );
  }
}

export default ChatBar;