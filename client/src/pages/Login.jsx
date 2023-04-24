import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';


export default function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate()
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const handleValidation = () => {
    const { password, username } = values;
    let isSuccess = true;
    if (password === '') {
      toast.error(
        'Username and password required.',
        toastOptions
      );
      isSuccess = false;
    } else if (username === '') {
      toast.error(
        'Username and password required.',
        toastOptions
      );
      isSuccess = false;
    }
    return isSuccess;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, } = values;
      const { data } = await axios.post(
        loginRoute,
        {
          username,
          password,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/");
      }
    }
  }


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div id='login' className='w-full max-w-xs mx-auto my-24'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='bg-white shadow-md rounded px-8 pt-6 mb-4'
      >
        <label
          htmlFor='username'
          className='block text-gray-700 text-sm font-bold mb-2'
        >
          Enter Username
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            name='username'
            placeholder='username'
            required
            id='username'
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label
          htmlFor='password'
          className='block text-gray-700 text-sm font-bold mb-2'
        >
          Enter password
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='password'
            name='password'
            id='password'
            required
            placeholder='password'
            onChange={(e) => handleChange(e)}
          />
        </label>

        <button
          type='submit'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Login!
        </button>
        <div>
          Don't have an account?
          <Link className='text-blue-600 visited:text-blue-600' to='/register'>
            Register
          </Link>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

