import { useApolloClient } from "@apollo/client"
import { useNavigate } from "react-router-dom"


export const useSignout = (setNot, setToken) => {
    const client = useApolloClient()
    const navigate = useNavigate()
    
    const signout = () => {  
        localStorage.removeItem('library-user-token')
        setToken(null)
        client.resetStore()
        setNot({title: 'you are not logged in. Please log in to enjoy full features', status: 'warning', link: {title: 'click here to log in', anchor: '/login'}})
        navigate('/books')
    }

    return signout
}