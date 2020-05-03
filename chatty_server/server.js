// server.js

const express = require('express')
const SocketServer = require('ws').Server
const WebSocket = require('ws')
const { v4: uuid } = require('uuid')

const { messageTypes } = require('./constants')

const PORT = 3001

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  )

const wss = new SocketServer({ server })

function broadcastMessage(message, color) {
  message = JSON.parse(message)
  message.id = uuid()

  switch (message.type) {
    case messageTypes.USER_MESSAGE:
      console.log(`${message.id}: ${message.username} says ${message.content}`)
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              ...message,
              color: color,
              type: 'incomingMessage'
            })
          )
        }
      })
      break
    case messageTypes.NOTIFICATION_MESSAGE:
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              ...message,
              type: 'incomingNotification'
            })
          )
        }
      })
      break
    case messageTypes.USER_COUNT_ADD:
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: 'userCountChange',
              content: 'A new user has connected',
              userCount: wss.clients.size,
              id: message.id
            })
          )
        }
      })
      break
    case messageTypes.USER_COUNT_SUB:
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: 'userCountChange',
              content: `${message.user} has disconnected`,
              userCount: wss.clients.size,
              id: message.id
            })
          )
        }
      })
      break
  }
}

function randomColor() {
  const colors = ['blue', 'red', 'green', 'orange', 'purple', 'black', 'teal']
  return colors[Math.floor(Math.random() * 7)]
}

wss.on('connection', (ws) => {
  console.log('Client connected. Total count: ' + wss.clients.size)

  const color = randomColor()
  let user = 'Anon'

  broadcastMessage(JSON.stringify({ type: 'userCountAdd' }))

  ws.on('message', function incoming(message) {
    const tempMessage = JSON.parse(message)
    if (tempMessage.type === 'postNotification') {
      user = tempMessage.user
    }

    broadcastMessage(message, color)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
    broadcastMessage(JSON.stringify({ type: 'userCountSub', user: user }))
  })
})
