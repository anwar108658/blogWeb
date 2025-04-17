import React, { act } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../assets/logo.png'
import LogoutBtn from '../logoutBtn/logoutBtn'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate(); 
  
  const navItems = [
    {name:"Home",path:"/",active:true},
    {name:"Login",path:"/login",active:!authStatus},
    {name:"Signup",path:"/signup",active:!authStatus},
    {name:"All Posts",path:"/all-posts",active:authStatus},
    {name:"Add Post",path:"/add-post",active:authStatus},
  ]
  return (
    <nav className='flex justify-between items-center bg-gray-800 text-white p-2'>
      <div>
        <img src={logo} width={50} alt="" />
      </div>
      <div>
        <ul className='flex items-center gap-3'>
          {navItems.map((item) => 
          item.active ? (
            <li key={item.name} >
              <button onClick={() => navigate(item.path)} className='cursor-pointer'>{item.name}</button>
            </li>
          ):null
          )}
          {authStatus && (
            <li key="logout" >
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header