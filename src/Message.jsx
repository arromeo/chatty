import React, { Component, Fragment } from 'react';

class Message extends Component 
{
  render() {
    const { type, content, username, color } = this.props.message;

    const userColor = { color: color }
    let strippedContent = content; 

    // Checks for image URLs and displays the first one that matches.
    // Also replaces img URLs with a blank string at the end.
    let re = /(^|\s)(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/g;
    let match = strippedContent.match(re);
    let image = null;
    if (re.test(strippedContent)) {
      image =  (<div className="chat-image"><br /><img src={ match[0] }/></div>);
      strippedContent = strippedContent.replace(re, ''); 
    }
    
    // Determins if the message is a chat message or a notification
    // and renders the correct content type.
    return ((type === 'incomingMessage')
      ? (
        <div className="message">
          <span className="message-username" style={ userColor }>{ username }</span>
          <span className="message-content">{ strippedContent }{ image }</span>
        </div>
      ) : (
        <div className="message">
          <span className="message system">{ strippedContent }</span>
        </div>
      )
    )
    
  }
}

export default Message;