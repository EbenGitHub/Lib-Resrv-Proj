import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../gql/mutations"

export const useSignup = ({setNot}) => {
    const navigate = useNavigate()

    const [signup, result] = useMutation(CREATE_USER, {
        onError: (error) => {
        console.log(error.graphQLErrors[0].message)
        if (RegExp(/to be unique/i).test(error.graphQLErrors[0].extensions.reason)) {
            setNot({title: "USER ALREADY EXIST!!!", link: {title: 'PLEASE LOG IN TO YOUR ACCOUNT.', anchor: './login'}})
        } else {
        setNot({title: error.graphQLErrors[0].extensions.reason?.toUpperCase(), link: {title: 'Already have an account ? Login', anchor: './login'}})
        }
        }
    })

    useEffect(() => {
        if ( result.data ) {
        setNot({title: 'signup was successfully', status: 'success'})
        setNot({title: 'You need to login with your new account', status: 'warning'})
        navigate('/login')
        }
    }, [result.data]) // eslint-disable-line

    return signup
}