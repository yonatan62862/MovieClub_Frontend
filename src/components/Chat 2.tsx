import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

// Connect socket clearly typed
const socket: typeof Socket = io("http://localhost:4000");

// Define interface for a Message
interface IMessage {
  text: string;
  sender: string;
}

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Replace this with your actual userId from context/store
  const userId = "PLACEHOLDER_USER_ID";

  useEffect(() => {
    socket.on('sendMessage', (msg: IMessage) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('sendMessage');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { text: message, sender: userId });
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, i) => <div key={i}>{msg.text}</div>)}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;