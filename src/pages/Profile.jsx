import React from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'



function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const {name, email} = formData
  const logout = () => {
    auth.signOut()
    navigate('/')
  }
  const onsubmit = async () => {
    try {
      if(name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {displayName: name})
        //await updateDoc(db, `users/${auth.currentUser.uid}`, {name})
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {name})
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  const onChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Profile</p>
        <button className="logOut" type="button" onClick={logout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">
            Personal Details
          </p>
          <p className='changePersonalDetails' onClick={() => {changeDetails && onsubmit()
            setChangeDetails((prevState) => !prevState)}
          }>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className="profileCard"> 
          <form>
            <input type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails}
            value={name} onChange={onChange}/>
            <input type="text" id='email' className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails}
            value={email} onChange={onChange}/>
          </form>
        </div>
      </main>
    </div>

  )
}

export default Profile
