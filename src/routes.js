import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/Page404';
import PhoneRegister from './pages/PhoneRegister'
import TaskXApplication from './TaskXApplication'

import { useAuth } from './contexts/AuthContext'

// ----------------------------------------------------------------------

export default function Router() {
  const { currentUser } = useAuth(); 
  return useRoutes([
    {
      path: '/dashboard',
      element: <TaskXApplication currentUser = {currentUser} />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard"/> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    {
      path: '/phonenumber',
      element : <PhoneRegister/>
    }
  ]);
}
