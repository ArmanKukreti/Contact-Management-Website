import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import UserProvider from './context/userContext'
import Logout from './pages/Logout'


const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout/></UserProvider>,
    children: [
      {index: true, element: <Home/>},
      {path: "dashboard", element: <Dashboard/>},
      {path: "login", element: <Login/>},
      {path: "register", element: <Register/>},
      {path: "logout", element: <Logout/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
