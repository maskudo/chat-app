import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { registerUser, updateUser } from '../slices/userSlice';
import toastOptions from '../utils/toastOptions';

function isAlphaNumeric(str) {
  let code;
  let i;
  let len;

  for (i = 0, len = str.length; i < len; i += 1) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

export default function Register() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleValidation = () => {
    const { password, confirmPassword, username } = values;
    let isSuccess = true;
    if (username.length < 3) {
      toast.error(
        'Username should be longer than 3 characters in length',
        toastOptions
      );
      isSuccess = false;
    }
    if (!isAlphaNumeric(username)) {
      toast.error(
        'Username can only contain alphanumeric characters',
        toastOptions
      );
      isSuccess = false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', toastOptions);
      isSuccess = false;
    }
    if (password.length < 7) {
      toast.error(
        'Password should be longer than 7 characters in length',
        toastOptions
      );
      isSuccess = false;
    }

    return isSuccess;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      let data = await dispatch(registerUser({ password, username }));
      data = data.payload;
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        await dispatch(updateUser(data.user));
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div
      id="register"
      className="register w-full max-w-xs mx-auto my-36 p-5 shadow-md rounded-lg"
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mb-4 text-white font-normal"
      >
        <label htmlFor="username" className="block  text-sm  mb-2">
          Enter Username
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            type="text"
            name="username"
            placeholder="Username"
            required
            id="username"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label htmlFor="password" className="block  text-sm  mb-2">
          Enter password
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-black"
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label htmlFor="confirmPassword" className="block text-sm  mb-2">
          Confirm password
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            id="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-300 text-white  my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Register!
        </button>
        <div className="py-2">
          Already have an account?
          <Link
            className="text-orange-200 visited:text-orange-200 hover:text-orange-300 mx-1 drop-shadow-md"
            to="/login"
          >
            Login
          </Link>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}
