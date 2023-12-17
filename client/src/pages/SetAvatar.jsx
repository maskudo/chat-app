import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { updateUser } from '../slices/userSlice';
import toastOptions from '../utils/toastOptions';
import { setAvatarRoute } from '../utils/APIRoutes';
import useUser from '../hooks/useUser';

export default function SetAvatar() {
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useUser();
  const fallbackImage = user?.avatarImage;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.patch(
      `${setAvatarRoute}/${user?._id}/setavatar`,
      formData,
      config
    );
    setCurrentAvatar(res.data.user.avatarImage);
    dispatch(updateUser(res.data.user));
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 4 * 1024 * 1024) {
      toast.error('File size should be smaller than 4 MB', toastOptions);
      e.target.value = '';
    } else {
      const url = URL.createObjectURL(file);
      setCurrentAvatar(url);
      setSelectedFile(file);
    }
  };
  return (
    <div className="set-avatar w-full h-full flex flex-col  justify-center align-middle my-32 ">
      <div className="image-container w-full flex justify-center">
        <img
          src={currentAvatar || fallbackImage}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = fallbackImage;
          }}
          className="h-20 w-20 rounded-full mx-5 bg-orange-300"
          alt="user-avatar"
        />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" flex flex-col justify-center align-middle w-full my-4"
      >
        <div className="input-container w-full flex justify-center">
          <input
            name="avatar"
            type="file"
            placeholder="Avatar"
            id="avatar"
            required
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
        </div>
        <div className="buttons  w-full flex justify-center text-white">
          <button
            type="submit"
            className="rounded-sm bg-blue-400 p-2 m-2 disabled:opacity-75 "
          >
            Submit
          </button>
        </div>
      </form>
      )
    </div>
  );
}
