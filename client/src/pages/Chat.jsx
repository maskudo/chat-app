import { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import ChatInterface from '../components/ChatInterface';
import { logoutUser } from '../slices/userSlice';
import toastOptions from '../utils/toastOptions';
import { Header } from '../components/Header';
import { getAllMessages, sendNewMessage } from '../slices/messageSlice';

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
    async function getMessages() {
      if (!currentUserId) {
        navigate('/login');
      } else {
        let data = await dispatch(
          getAllMessages({ currentUserId, selectedContact })
        );
        data = data.payload;
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else {
          setMessages(data);
        }
      }
    }
    if (selectedContact !== undefined) {
      getMessages();
    }
  }, [selectedContact]);

  const sendMessage = useCallback(
    async (text) => {
      const message = {
        text,
        sender: currentUserId,
        receiver: selectedContact,
      };
      let data = await dispatch(sendNewMessage({ message }));
      data = data.payload;
      if (data.status === false) {
        const errorMsg = 'Error sending message';
        toast.error(data.msg, { ...toastOptions, toastId: errorMsg });
      } else {
        // console.log(data.data);
        socket.current.emit('send-msg', data.data);
        setMessages([...messages, data.data]);
      }
    },
    [messages, setMessages, currentUserId, selectedContact]
  );

  useEffect(() => {
    // console.log('checking socket.current', socket.current);
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, [socket, selectedContact]);

  useEffect(() => {
    if (arrivalMsg) {
      setMessages([...messages, arrivalMsg.message]);
    }
  }, [arrivalMsg]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };
  const handleSignOut = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="h-screen chat-app overflow-hidden">
      <div className="header flex justify-center">
        <Header handleSignOut={handleSignOut} currentUser={currentUser} />
      </div>
      <div className=" w-screen h-full  text-white flex justify-center items-center mt-0">
        <div className="chat-container w-9/12 flex ">
          <div className="contacts basis-2/6 rounded-lg overflow-auto mr-8">
            {contacts &&
              contacts.map((contact) => (
                <Contact
                  key={contact.username}
                  contact={contact}
                  selected={selectedContact === contact._id}
                  latestMessage={messages && messages[messages.length - 1]}
                  onClick={() => {
                    handleContactClick(contact._id);
                  }}
                />
              ))}
          </div>
          <div className="chat-main basis-4/6  rounded-lg">
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
