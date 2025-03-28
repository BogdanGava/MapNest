
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {


  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
