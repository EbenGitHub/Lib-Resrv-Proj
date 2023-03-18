import { useState, useEffect } from 'react'
import {
  Routes, Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Landing from './components/Landing'
import Books from './components/Books'
import Book from './components/Book/Book'
import MyReservations from './components/MyReservations'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { authenticate } from './reducers/authenticationReducer'
import Notify from './components/Notify'
import Footer from './components/Footer'
import ErrorRoutes from './components/Error/ErrorRoute'
import Verify from './components/Verify'
import Tour from './components/Tour'


const App = () => {
  const [form, setForm] = useState({})

  const dispatch = useDispatch()
  const isUserNew = useSelector(state => state.tourguid.guid)

  useEffect(() => {
    const tk = localStorage.getItem('library-user-token')
    if (tk) {
      dispatch(authenticate(tk))
    } else {
      dispatch(createNotification({title: 'you are not logged in. Please log in to enjoy full features', status: 'warning', link: {title: 'click here to log in', anchor: '/login'}}))
    }
  }, []) // eslint-disable-line

  return (
      <div>
        <NavBar/>
        <Notify/>
        {
          isUserNew ? <Tour/> : null
        }
        <Routes>
          <Route path='/signup' element={<SignUp setForm={setForm}/>} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/' element={<Landing />} />  
          <Route path='/books' element={<Books />} />
          <Route path='/books/:id' element={<Book />} />
          <Route path='/reservations' element={<MyReservations />} />
          {
            form.email ? <Route path='/verify' element={<Verify form={form} />} /> : null
          }
          <Route path='*' element={<ErrorRoutes />} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App