import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import { SiGooglechat } from "react-icons/si";
import UserContext from '../../../contextAPI/UserContext';
import io from 'socket.io-client'

const socket = io.connect(`${ process.env.REACT_APP_BACKEND_URL}`);

function RightRoom() {
 
  const { selectedUser } = useContext(UserContext);
  const [selectFriend, setSelectFriend] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sender = sessionStorage.getItem('email');

  
  useEffect(() => {
    async function selectUser() {
      try {
        const result = await axios.post(`${ process.env.REACT_APP_BACKEND_URL}/SelectedUser`, { selectedUser });
        setSelectFriend(result.data);
        const getMessage = await axios.post(`${ process.env.REACT_APP_BACKEND_URL}/getMessage`, { from: sender, to: selectedUser });
        setMessages(getMessage.data);
  //-------------------------------join-------------socket----------------------------------
        socket.emit('join', {email: sender});

      } catch (err) {
        console.error("Error:", err); // Handle error
      }
    }
    if (selectedUser) {
      selectUser();
    }
  },[selectedUser, sender]); // Include sender in dependency array to update when sender changes

  const sendMessage = async () => {
    if (message.trim() !== '') { // Trim the message to ensure it's not just spaces
      try {
        await axios.post(`${ process.env.REACT_APP_BACKEND_URL}/sendMessage`, { message, from: sender, to: selectedUser });
        const newMessages = [...messages, { fromSelf: true, message: message }];

        socket.emit('send_message', {email:selectedUser,msg:message });

        setMessages(newMessages);

        setMessage(''); // Clear input after sending
      } catch (err) {
        console.error("Error sending message:", err); // Handle error
      }
    }
  }
  //Listen for messages from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      // Update messages state with the received message
     
      setMessages([...messages, { fromSelf: false, message: data }]);
    });

    // Clean up socket event listener
    
  }, [messages]);

  if (!selectFriend) {
    return (
      <div style={{ background: 'lightgreen', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', zIndex: '-1' }}>
        <SiGooglechat style={{ fontSize: '150px' }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%',overflowX:'auto' }}>

      {/*----------------------------- Top Section-------------------------------------------------------- */}

      <div style={{ background: 'lightgrey', height: '100px', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <img style={{ width: "60px", height: '60px', borderRadius: '50%', background: 'white', border: "2px solid lightgreen", cursor: "pointer", marginRight: '20px' }}
          src={selectFriend.image} alt='' />
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectFriend.name}</div>
          <div style={{ fontSize: '17px', color: '#666' }}>{selectFriend.email}</div>
        </div>
      </div>

      {/*------------------------------------------Chat Section-------------------------------------------- */}

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#f5f5f5',scrollbarWidth:'none', }}>

        {/*--------------------------------------------- Chat----------------------------------------------- */}

        {messages.map((msg, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: msg.fromSelf ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
            <div style={{ maxWidth: '50%', borderRadius: '8px', padding: '10px', background: msg.fromSelf ? '#dcf8c6' : 'white', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', border: '1px solid #ddd', wordWrap: 'break-word' }}>
              <p style={{ margin: 0 }}>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/*-------------------------------------- Send Chat--------------------------------------------- */}
      
      <div style={{ padding: '10px', borderTop: '1px solid #ddd', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            style={{ flex: 1, height: '35px', borderRadius: '20px', padding: '0 15px', marginRight: '10px', border: '1px solid #ddd' }}
            type='text'
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'lightgreen', cursor: 'pointer' }}
            onClick={sendMessage}
          >
            <IoSend style={{ fontSize: '20px', color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightRoom;
