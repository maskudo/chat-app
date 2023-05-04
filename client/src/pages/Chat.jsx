import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import Contact from '../components/Contact';

export default function Chat() {
  const [contacts, setContacts] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    async function fn() {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(user);
      }
    }
    fn();
  }, []);

  useEffect(() => {
    async function fn() {
      if (currentUser) {
        let data;
        try {
          data = await axios.get(`${allUsersRoute}/${currentUser}`);
        } catch (error) {
          console.log(error);
        }
        setContacts(data.data);
      }
    }
    fn();
  }, [currentUser]);
  return (
    <div className="border-black bg-slate-800 w-screen h-screen text-white flex justify-center items-center">
      <div className="chat-container w-9/12 h-5/6 bg-slate-500 flex">
        <div className="contacts basis-2/6 border border-gray-600">
          {contacts &&
            contacts.map((contact, index) => (
              <Contact key={`contact-${index}`} contact={contact} />
            ))}
        </div>
        <div className="messages basis-4/6 border border-gray-600">
          Messages lol
        </div>
      </div>
    </div>
  );
}
