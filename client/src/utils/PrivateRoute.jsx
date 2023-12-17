import { Navigate, Outlet } from 'react-router-dom';
import useUser from '../hooks/useUser';

export default function PrivateRoute() {
  // const token = localStorage.getItem('token');
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
}
