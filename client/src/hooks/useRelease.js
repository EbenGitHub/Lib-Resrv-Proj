import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { RELEASE_BOOK } from "../gql/mutations"
import {ME} from '../gql/queries'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"

export const useRelease = () => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.authentication)

    const navigate = useNavigate()
    const [release, relResult] =  useMutation(RELEASE_BOOK, {
        onError: (error) => {
            dispatch(createNotification({title: error.graphQLErrors[0].message}))
        },
        refetchQueries: [{query: ME}],
      })

      useEffect(() => {
        if ( relResult.data ) {
            relResult.data && relResult.data.releaseBook ? 
                dispatch(createNotification({title: 'releasing the book was successful', status: 'success'})) : 
                dispatch(createNotification({title: 'something went wrong. Please refresh the page!', status: 'danger'}))
        }
      }, [relResult.data]) // eslint-disable-line

      const releaseBook = (id) => {
        if (!authentication) {
            dispatch(createNotification({title: 'You need to sign in first to reserve a book. Already have an account? ', link: {title: 'click here to sign in', anchor: '/login'}}))
            navigate('/signup')
            return
        }
        release({
            variables: {
                id
            }
        })
    }

    const releaseButton = (id) => <div className='flex items-center relative' onClick={() => releaseBook(id)}>
        <div className='text-sm text-white mt-5 bg-rose-500 p-1 rounded drop-shadow-xl cursor-pointer'>Release Book</div>
        </div>

    return releaseButton
}