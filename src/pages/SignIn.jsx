import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {toast} from 'react-toastify'


function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
  
      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Invalid credentials')
      
    }
  }
  

  return (
    <>
     
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <form onSubmit={onSubmit} >
        <input
          type="email"
          name="email"
          id='email'
          value={email}
          onChange={onChange}
          placeholder="Email"
          className="emailInput"
          required
        />

        <div className="passwordInputDiv">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            id='password'
            onChange={onChange}
            placeholder="Password"
            className="passwordInput"
            required
          />
          <img
            src={visibilityIcon}
            alt="Show password"
            className='showPassword'
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot password?
        </Link>
        <div className='signInBar'>
          <p className='signInText'>Sign In</p>
          <button  className='signInButton'>
            <ArrowRightIcon fill='#ffffff' width='34px' />
          </button>
        </div>
        
      </form>

      
          <Link to="/sign-up" className="registerLink">
            Register
          </Link>
       
    </div>
      
    </>
  )
}

export default SignIn
