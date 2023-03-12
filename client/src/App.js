import { useState, useEffect } from 'react'
import {
  Routes, Route, Link, useNavigate, useMatch
} from 'react-router-dom'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Landing from './components/Landing'
import Books from './components/Books'
import MyReservations from './components/MyReservations'


const App = () => {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const tk = localStorage.getItem('library-user-token')
    if (tk) setToken(tk)
  }, [])


  return (
      <div>
        <NavBar token={token} />
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/' element={<Landing />} />  
          <Route path='/books' element={<Books />} />
          <Route path='/reservations' element={<MyReservations />} />
        </Routes>
      </div>
  )
}

export default App