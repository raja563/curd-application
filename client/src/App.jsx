import { useState } from 'react'
import viteLogo from '/vite.svg'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css'
import User from './components/getUser/User'
import Add from './components/addUser/Add'
import Update from './components/updateUser/Update'

function App() {
  const [count, setCount] = useState(0)
const allRoute=createBrowserRouter([
  {
    path:'/',
    element:<User/>  
  },
  {
    path:'/add',
    element:<Add/>  
  },
  {
    path:'/edit/:id',
    // element:"update"
    element:<Update/> 
  },
])

  return (
    <>
    <RouterProvider router={allRoute}/>
    </>
  )
}

export default App
