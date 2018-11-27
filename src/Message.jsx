import React, { Component } from 'react';

class Message extends Component 
{
  render() {
    const { type, content, username } = this.props.message;

    const messageOrNotification = (type === 'incomingMessage')
      ? (<span className="message-username">{ username }</span>)
      : (<span className="message-username"> Message: </span>)

    return (
      <div className="message">
        {messageOrNotification}
        <span className="message-content">{ content }</span>
      </div>
    );
  }
}

export default Message;