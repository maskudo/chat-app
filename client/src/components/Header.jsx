import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../slices/userSlice';

export function Header() {
  const currentUser = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="w-full">
      <div className="header w-9/12 flex  justify-between drop-shadow-sm py-2 shadow-md shadow-gray-300 mx-auto px-2">
        <Link to="/" className="logo flex justify-center align-middle ">
          <img
            src="../../assets/images/logo2.png"
            alt="company-logo"
            className="h-16 w-auto"
          />
        </Link>
        <div className="right flex align-middle justify-center ">
          <Link to="/setavatar" className="mx-5 pt-3">
            <img
              src={currentUser?.avatarImage}
              alt="Current User Avatar"
              className="h-10 w-10 rounded-full bg-gray-300"
            />
          </Link>
          <button
            onClick={handleSignOut}
            type="button"
            className="text-xl text-red-400"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>
    </header>
  );
}
