import { useNavigate } from "react-router-dom"
import { useApolloClient, useMutation } from "@apollo/client"
import { LOGIN } from "../gql/mutations"
import { useEffect } from "react"

export const useLogin = ({setNot, setToken}) => {

    const navigate = useNavigate()
    const client = useApolloClient()

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
        console.log(error.graphQLErrors[0].message)
        setNot({title: error.graphQLErrors[0].extensions.reason.toUpperCase(), link: {title: 'New to this website ? Signup', anchor: './signup'}})
        }
    })

    useEffect(() => {
        if ( result.data ) {
        const token = result.data.login.value
        const id = result.data.login.id
        setToken(token)
        localStorage.setItem('library-user-token', token)
        localStorage.setItem('library-user-id', id)
        setNot({title: 'logged in successfully', status: 'success'})
        client.resetStore()
        navigate('/books')
        }
    }, [result.data]) // eslint-disable-line

    return login
}