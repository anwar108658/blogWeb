import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
       const confirmMessage = confirm("Are you sure you want to logout?")
        if(!confirmMessage) return
        
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.log("Logout error",error)
        })
    }
  return (
    <button 
    className='bg-red-600 px-3 py-1 text-[.9rem] rounded-[.5rem] cursor-pointer hover:bg-red-700 transition-all duration-300' 
    onClick={handleLogout}>
      LogOut
    </button>
  )
}

export default LogoutBtn