import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <div className="h-screen overflow-clip">
      <div className="header flex justify-center">
        <Header />
      </div>
      <div className="div h-screen chat-app overflow-hidden">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}
