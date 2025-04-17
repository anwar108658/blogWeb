import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { login as storeLogin } from '../../store/authSlice/authSlice'
import Input from '../Input/Input'
import logo from '../../assets/logo.png'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const loginHandler = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(storeLogin(currentUser));
                    navigate('/')
                } 
            }
        } catch (error) {
            setError(error.message)
        }

    }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-inner shadow-gray-200">
        <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-14 mb-4" />
            <h2 className="text-2xl font-bold flex-1 text-[#1E2939] text-center mb-6">
                Login
            </h2>
        </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit(loginHandler)} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value="anwar108658@gmail.com"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          type="password"
          placeholder="Password"
            value="banoqabil108658"
          {...register("password", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login