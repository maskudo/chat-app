import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { updateUser } from '../slices/userSlice';

export default function SetAvatar() {
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [preview, setPreview] = useState(false);
  const user = useSelector((state) => state.user.user);
  const fallbackImage = user?.avatarImage;
  const dispatch = useDispatch();
  const onPreview = () => {
    if (currentAvatar) {
      setPreview(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${setAvatarRoute}/${user?._id}/setavatar`,
        {
          avatarImage: currentAvatar,
        }
      );
      console.log(res.data.user);
      setCurrentAvatar('');
      setPreview(false);
      dispatch(updateUser(res.data.user));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="set-avatar">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => {
            setCurrentAvatar(e.target.value);
            setPreview(false);
          }}
          type="url"
          required
        />
        <button type="button" onClick={onPreview}>
          Preview
        </button>
        {preview && <button type="submit">Submit</button>}
      </form>
      {preview && (
        <img
          src={currentAvatar}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = fallbackImage;
          }}
          className="h-10 w-10 rounded-full mx-5 bg-orange-300"
          alt="user-avatar"
        />
      )}
    </div>
  );
}
