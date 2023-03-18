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
import * as uuid from 'uuid'
import Notify from './components/Notify'
import Footer from './components/Footer'
import ErrorRoutes from './components/Error/ErrorRoute'
import Verify from './components/Verify'
import Tour from './components/Tour'


const App = () => {
  const [token, setToken] = useState(null)
  const [notify, setNotify] = useState([])
  const [form, setForm] = useState({})
  const [isUserNew, setIsUserNew] = useState(false)

  useEffect(() => {
    const tk = localStorage.getItem('library-user-token')
    if (tk) {
      setToken(tk)
    } else {
      setNot({title: 'you are not logged in. Please log in to enjoy full features', status: 'warning', link: {title: 'click here to log in', anchor: '/login'}})
    }
  }, []) // eslint-disable-line

  const setNot = (msg) => {
    const id = uuid.v4()
    setNotify(notify.concat({id, title: msg.title, status: msg.status, link: msg.link}))
  }

  const deleNot = (id) => {
    setNotify(notify.filter(n => n.id !== id))
  }

  return (
      <div>
        <NavBar token={token} setToken={setToken} setNot={setNot}/>
        <Notify notify={notify} deleNot={deleNot}/>
        {
          isUserNew ? <Tour token={token} setIsUserNew={setIsUserNew} /> : null
        }
        <Routes>
          <Route path='/signup' element={<SignUp setNot={setNot} token={token} setForm={setForm}/>} />
          <Route path='/login' element={<LogIn setToken={setToken} setNot={setNot} token={token}/>} />
          <Route path='/' element={<Landing />} />  
          <Route path='/books' element={<Books setNot={setNot} token={token}/>} />
          <Route path='/books/:id' element={<Book setNot={setNot} token={token}/>} />
          <Route path='/reservations' element={<MyReservations setNot={setNot} token={token}/>} />
          {
            form.email ? <Route path='/verify' element={<Verify setNot={setNot} form={form} setIsUserNew={setIsUserNew} />} /> : null
          }
          <Route path='*' element={<ErrorRoutes />} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App