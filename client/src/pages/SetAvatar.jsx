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
            ref={inputRef}
            onChange={(e) => {
              setCurrentAvatar(e.target.value);
              setPreview(false);
            }}
            type="url"
            placeholder="Enter Avatar URL"
            className="rounded-sm p-1 w-96"
            required
          />
        </div>
        <div className="buttons  w-full flex justify-center text-white">
          <button
            type="button"
            className="preview rounded-sm bg-blue-400 p-2 m-2 "
            onClick={onPreview}
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={!preview}
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
