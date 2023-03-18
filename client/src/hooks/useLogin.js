import { useNavigate } from "react-router-dom"
import { useApolloClient, useMutation } from "@apollo/client"
import { LOGIN } from "../gql/mutations"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { authenticate } from "../reducers/authenticationReducer"
import { createNotification } from "../reducers/notificationReducer"

export const useLogin = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const client = useApolloClient()

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
        console.log(error.graphQLErrors[0].message)
        dispatch(createNotification({title: error.graphQLErrors[0].extensions.reason.toUpperCase(), link: {title: 'New to this website ? Signup', anchor: './signup'}}))
        }
    })

    useEffect(() => {
        if ( result.data ) {
        const token = result.data.login.value
        const id = result.data.login.id
        dispatch(authenticate(token))
        localStorage.setItem('library-user-token', token)
        localStorage.setItem('library-user-id', id)
        dispatch(createNotification({title: 'logged in successfully', status: 'success'}))
        client.resetStore()
        navigate('/books')
        }
    }, [result.data]) // eslint-disable-line

    return login
}