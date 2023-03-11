import { useState } from 'react'
import {
  Routes, Route, Link, useNavigate, useMatch
} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './gql/queries'
import Login from './components/Login'


const App = () => {
 const data = useQuery(ALL_BOOKS, {
    variables: {
        title: 'python'
    }
 })
 console.log(data.data)


  return (
      <div>
        <Login />
      </div>
  )
}

export default App