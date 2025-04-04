import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { login as storeLogin } from '../../store/authSlice/authSlice'
import Input from '../Input/Input'

const Registered = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const RegisteredHandler = async (data) => {
        setError('')
        try {
            const session = await authService.createAccount(data)
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
        <h2>Register</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit(RegisteredHandler)}>
            <Input label="name" type="text" placeholder='Name' {...register('name', {required: true})} />
            <Input label="email" type="email" placeholder='Email' {...register('email', {required: true})} />
            <Input label="password" type="password" placeholder='Password' {...register('password', {required: true})} />
             <button type='submit'>Register</button>
        </form>
    </div>
  )
  
}

export default Registered