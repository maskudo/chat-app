import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute, allMessagesRoute } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import ChatInterface from '../components/ChatInterface';

// TODO: replace console logs with toasts

export default function Chat() {
  const [contacts, setContacts] = useState(undefined);
  const [messages, setMessages] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    async function fn() {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(user._id);
        let data = [];
        try {
          data = await axios.get(`${allUsersRoute}/${user._id}`);
        } catch (error) {
          console.log(error);
        }
        setContacts(data.data);
      }
    }
    fn();
  }, []);

  useEffect(() => {
    async function fn() {
      let data = [];
      try {
        const route = `${allMessagesRoute}/${currentUser}/${selectedContact}`;
        data = await axios.get(route);
      } catch (error) {
        console.log(error);
      }
      setMessages(data.data);
    }
    fn();
  }, [selectedContact]);

  async function sendMessage(text) {
    try {
      const message = {
        text,
        sender: currentUser,
        receiver: selectedContact,
      };
      const response = await axios.post(`${allMessagesRoute}`, message, {
        headers: {
          'content-type': 'application/json',
        },
      });
      console.log(response.data.data);
      setMessages([...messages, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleContactClick(contact) {
    setSelectedContact(contact);
  }
  return (
    <div className="border-black bg-slate-800 w-screen h-screen text-white flex justify-center items-center">
      <div className="chat-container w-9/12 h-5/6 bg-slate-500 flex">
        <div className="contacts basis-2/6 border border-gray-600 overflow-auto">
          {contacts &&
            contacts.map((contact) => (
              <Contact
                key={contact.username}
                contact={contact}
                selected={selectedContact === contact._id}
                onClick={() => {
                  handleContactClick(contact._id);
                }}
              />
            ))}
        </div>
        <div className="chat-main basis-4/6 border border-gray-600">
          {/* {messages && messages.map((message) => <h3>{message}</h3>)} */}
          <ChatInterface messages={messages} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
