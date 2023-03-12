import { useState } from 'react'
import {
  Routes, Route, Link, useNavigate, useMatch
} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './gql/queries'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Landing from './components/Landing'


const App = () => {
 const data = useQuery(ALL_BOOKS, {
    variables: {
        title: 'python'
    }
 })
 console.log(data.data)


  return (
      <div>
        <NavBar />
        <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/' element={<Landing />} />
            
            
            
        </Routes>
      </div>
  )
}

export default App