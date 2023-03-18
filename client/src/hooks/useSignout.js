import { useApolloClient } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { unauthenticate } from "../reducers/authenticationReducer"
import { createNotification } from "../reducers/notificationReducer"

export const useSignout = () => {
    const dispatch = useDispatch()

    const client = useApolloClient()
    const navigate = useNavigate()
    
    const signout = () => {  
        localStorage.removeItem('library-user-token')
        dispatch(unauthenticate())
        client.resetStore()
        dispatch(createNotification({title: 'you are not logged in. Please log in to enjoy full features', status: 'warning', link: {title: 'click here to log in', anchor: '/login'}}))
        navigate('/books')
    }

    return signout
}