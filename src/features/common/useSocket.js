import { useEffect, useRef } from 'react'

export function useSocket(url, onMessageCb) {
  const socket = useRef()

  useEffect(() => {
    socket.current = new WebSocket(url)

    socket.current.onmessage = (event) => onMessageCb(event)

    return () => socket.current.close()
  }, [])

  const send = (dataObj) => socket.current.send(JSON.stringify(dataObj))
  const close = () => socket.current.close()

  return { send, close }
}
