import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import Contact from '../components/Contact';

export default function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    async function fn() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    }
    fn();
  }, []);

  useEffect(() => {
    async function fn() {
      if (currentUser) {
        // if (currentUser.isAvatarImageSet) {
        //   const data = axios.get(`${allUsersRoute}/${currentUser.id}`);
        //   setContacts(data.data);
        // } else {
        //   navigate('/setAvatar');
        // }
        // while setAvatar component not complete
        const data = axios.get(`${allUsersRoute}/${currentUser.id}`);
        setContacts(data.data);
      }
    }
    fn();
  }, [currentUser]);
  return (
    <div className="border-black bg-slate-800 w-screen h-screen text-white flex justify-center items-center">
      <div className="chat-container w-9/12 h-5/6 bg-slate-500 flex">
        <div className="contacts basis-2/6 border border-gray-600">
          <Contact />
        </div>
        <div className="messages basis-4/6 border border-gray-600">
          Messages lol
        </div>
      </div>
    </div>
  );
}
