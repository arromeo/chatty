import React, { Component } from 'react';

class Message extends Component 
{
  render() {
    const { type, content, username } = this.props.message;

    const messageOrNotification = (type === 'incomingMessage')
      ? (
        [<span className="message-username">{ username }</span>,
        <span className="message-content">{ content }</span>]
      ) : (
        <span className="message system">{ content }</span>
      )

    return (
      <div className="message">
        {messageOrNotification}
      </div>
    );
  }
}

export default Message;