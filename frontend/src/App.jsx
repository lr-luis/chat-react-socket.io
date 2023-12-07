import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/")
function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', receiveMessages)

    return () => {
      socket.off('message', receiveMessages)
    }

  }, [])

  const receiveMessages = (message) => setMessages(state => [...state, message])

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="test-2xl font-bold my-2">Chat react</h1>
        <input type="text" placeholder="write your message"
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
        />
        {/* <button>Send</button> */}
        <ul>
        {
          messages.map((message, index) => (
            <li key={index} className={
              `my-2 p-2 table test-sm rounded-md ${message.from == 'Me' ? 'bg-sky-700': 'bg-black ml-auto'}`
            }>
              <span className="text-xs text-slate-300 block">{message.from}</span>
              <span className="text-md">{message.body}</span>
            </li>
          ))
        }
      </ul>
      </form>
      
    </div>
  )
}

export default App;