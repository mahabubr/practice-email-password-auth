import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginBootstrap from './components/LoginBootstrap';
import RegisterReactBootstrap from './components/RegisterReactBootstrap';
import Main from './layout/Main';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <RegisterReactBootstrap></RegisterReactBootstrap>
        },
        {
          path: '/register',
          element: <RegisterReactBootstrap></RegisterReactBootstrap>
        },
        {
          path: '/login',
          element: <LoginBootstrap></LoginBootstrap>
        },
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
