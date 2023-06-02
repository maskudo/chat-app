import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar, updateUser } from '../slices/userSlice';

export default function SetAvatar() {
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [preview, setPreview] = useState(false);
  const user = useSelector((state) => state.user.user);
  const fallbackImage = user?.avatarImage;
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const onPreview = () => {
    if (currentAvatar) {
      setPreview(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        updateAvatar({ user, avatarImage: currentAvatar })
      );
      inputRef.current.value = '';
      setPreview(false);
      if (res.payload) {
        dispatch(updateUser(res.payload));
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="set-avatar">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={inputRef}
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
