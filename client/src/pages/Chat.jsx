import { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { allUsersRoute, allMessagesRoute, host } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import ChatInterface from '../components/ChatInterface';
import { logoutUser } from '../slices/userSlice';
import toastOptions from '../utils/toastOptions';
import { Header } from '../components/Header';

export default function Chat() {
  const [contacts, setContacts] = useState(undefined);
  const [messages, setMessages] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined);
  const [arrivalMsg, setArrivalMsg] = useState(undefined);
  const socket = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.user);
  const currentUserId = currentUser?._id;

  useEffect(() => {
    async function fn() {
      if (!currentUserId) {
        navigate('/login');
      } else {
        let data = [];
        try {
          data = await axios.get(`${allUsersRoute}/${currentUserId}`);
        } catch (error) {
          const errorMsg = 'Error fetching contacts';
          toast.error(errorMsg, {
            ...toastOptions,
            toastId: errorMsg,
          });
        }
        setContacts(data.data);
      }
    }
    fn();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUserId);
    } else {
      navigate('/login');
    }
  }, [currentUserId]);

  useEffect(() => {
    async function fn() {
      let data = [];
      try {
        const route = `${allMessagesRoute}/${currentUserId}/${selectedContact}`;
        data = await axios.get(route);
      } catch (error) {
        const errorMsg = 'Error fetching messages';
        toast.error(errorMsg, {
          ...toastOptions,
          toastId: errorMsg,
        });
      }
      setMessages(data.data);
    }
    if (selectedContact !== undefined) {
      fn();
    }
  }, [selectedContact]);

  const sendMessage = useCallback(
    async (text) => {
      try {
        const message = {
          text,
          sender: currentUserId,
          receiver: selectedContact,
        };
        const response = await axios.post(`${allMessagesRoute}`, message, {
          headers: {
            'content-type': 'application/json',
          },
        });
        socket.current.emit('send-msg', message);
        setMessages([...messages, response.data.data]);
      } catch (error) {
        const errorMsg = 'Error sending message';
        toast.error(errorMsg, {
          ...toastOptions,
          toastId: errorMsg,
        });
      }
    },
    [messages, setMessages, currentUserId, selectedContact]
  );

  useEffect(() => {
    // console.log('checking socket.current', socket.current);
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        // console.log(msg);
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, [socket, selectedContact]);

  useEffect(() => {
    if (arrivalMsg) {
      setMessages((prev) => [...prev, arrivalMsg.message]);
    }
  }, [arrivalMsg]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };
  const handleSignOut = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="h-screen chat-app">
      <Header handleSignOut={handleSignOut} currentUser={currentUser} />
      <div className="border-black  w-screen h-full  text-white flex justify-center items-center">
        <div className="chat-container w-9/12 h-5/6  flex">
          <div className="contacts basis-2/6 border  overflow-auto">
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
          <div className="chat-main basis-4/6 border border-gray-600 overflow-auto">
            <ChatInterface
              messages={messages}
              sendMessage={sendMessage}
              currentUser={currentUserId}
              selectedContact={selectedContact}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
