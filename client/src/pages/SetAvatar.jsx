import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import { setAvatarRoute } from '../utils/APIRoutes';

function SetAvatar() {
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {};
  useEffect(() => {
    async function myFunc() {
      try {
        // const data = [];
        const promises = [];
        for (let i = 0; i < 2; i += 1) {
          // const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          // const buffer = Buffer.from(image.data);
          // data.push(buffer.toString("base64"));
          const result = axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          promises.push(result);
        }
        const results = await Promise.all(promises);
        const data = results.map((result) =>
          Buffer.from(result.data).toString('base64')
        );
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.log('error fetching content');
      }
    }
    myFunc();
  }, []);

  return (
    <div>
      <header>
        <h1>trolol</h1>
      </header>
      <div className="set-avatar-container">SetAvatar</div>
      <div className="title-container">
        <h1>Pick an avatar as your profile picture.</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <div>
            <div
              className={`avatar ${index === selectedAvatar ? 'selected' : ''}`}
            >
              <img
                className="h-12"
                src={`data:image/svg+xml;base64, ${avatar}`}
                alt="avatar"
                onClick={() => setSelectedAvatar(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SetAvatar;
