import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { login as storeLogin } from '../../store/authSlice/authSlice'
import Input from '../Input/Input'

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
    <div className='login'>
        <h2>Login</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit(loginHandler)}>
            <Input label="email" type="email" placeholder='Email' {...register('email', {required: true})} />
            <Input label="password" type="password" placeholder='Password' {...register('password', {required: true})} />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login