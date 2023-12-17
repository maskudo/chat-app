import {
  faRightFromBracket,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../slices/userSlice';
import useUser from '../hooks/useUser';

export default function Header() {
  const { user: currentUser } = useUser();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="flex w-9/12 justify-between drop-shadow-sm py-2">
      <div className="left flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faMessage} className="text-3xl" />
        <span>Chatty</span>
      </div>
      <div className="right flex justify-center">
        <Link to="/setavatar" className="mx-5 flex flex-col items-center">
          <img
            src={currentUser?.avatarImage}
            alt="Current User Avatar"
            className="h-10 w-10 rounded-full  bg-orange-300"
          />
          <div>{currentUser?.username}</div>
        </Link>
        <button onClick={handleSignOut} type="button" className="text-xl">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </header>
  );
}
