import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.log("Logout error",error)
        })
    }
  return (
    <button className='btn btn-primary' onClick={handleLogout}>

    </button>
  )
}

export default LogoutBtn