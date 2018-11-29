// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from
   // the /public folder
  .use(express.static('public'))
  .listen(
    PORT,
    '0.0.0.0',
    'localhost',
    () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Message factory to broadcast messages to users depending on type.
function broadcastMessage(message, color) {
  message = JSON.parse(message);
  message.id = uuid();

  switch (message.type) {
    case 'postMessage':
    console.log(`${message.id}: ${message.username} says ${message.content}`);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            ...message,
            color: color,
            type: 'incomingMessage'
          }));
        }
      });
      break;
    case 'postNotification':
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            ...message,
            type: 'incomingNotification'
          }));
        }
      });
      break;
    case 'userCountAdd':
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'userCountChange',
            content: 'A new user has connected',
            userCount: wss.clients.size,
            id: message.id
          }));
        }
      });
      break;
    case 'userCountSub':
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'userCountChange',
            content: `${message.user} has disconnected`,
            userCount: wss.clients.size,
            id: message.id
          }));
        }
      });
      break;
  }
}

// Generates a random color to assign connecting users.
function randomColor() {
  const colors = ['blue', 'red', 'green', 'orange', 'purple', 'black', 'teal'];
  return colors[Math.floor(Math.random() * 7)]
}

wss.on('connection', (ws) => {
  console.log('Client connected. Total count: ' + wss.clients.size);

  // Assigns a color and default name to connecting users. This name is used
  // to broadcast when this user disconnects from the server.
  const color = randomColor();
  let user = 'Anon';

  // Broadcasts a message to all clients telling them this user has connected
  // and also updates the number of connected clients.
  broadcastMessage(JSON.stringify({type: 'userCountAdd'}));

  // Takes incoming message.
  ws.on('message', function incoming(message) {

    // Determines if incoming message is a name change. If it's a name change,
    // it updates the local variable before broadcasting.
    const tempMessage = JSON.parse(message);
    if (tempMessage.type === 'postNotification') {
      user = tempMessage.user;
    }

    broadcastMessage(message, color);
  });

  // When the user disconnects from the server, a message is broadcast
  // indicating this to all other clients.
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastMessage(JSON.stringify({type: 'userCountSub', user: user}));
  });
});
