import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <>
      <div className="header flex justify-center">
        <Header />
      </div>
      <Outlet />
    </>
  );
}
