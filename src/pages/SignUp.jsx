import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {name, email, password } = formData

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong')
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
          type="text"
          name="name"
          id='name'
          value={name}
          onChange={onChange}
          placeholder="Name"
          className="nameInput"
          required
        />
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
        <div className='signUpBar'>
          <p className='signUpText'>Sign Up</p>
          <button type="submit" className='signInButton'>
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

export default SignUp
