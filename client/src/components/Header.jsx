import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '../slices/userSlice';

export function Header() {
  const currentUser = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="flex w-9/12 justify-end drop-shadow-sm py-2">
      <Link to="/setavatar" className="mx-5">
        <img
          src={currentUser?.avatarImage}
          alt="Current User Avatar"
          className="h-10 w-10 rounded-full  bg-orange-300"
        />
      </Link>
      <button onClick={handleSignOut} type="button" className="text-xl">
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </header>
  );
}
