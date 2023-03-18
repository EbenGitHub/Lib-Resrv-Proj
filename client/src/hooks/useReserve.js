import { useMutation } from "@apollo/client"
import { RESERVE_BOOK} from "../gql/mutations"
import { ME } from '../gql/queries'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { userClicked } from "../reducers/tourguidReducer"

export const useReserve = () => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.authentication)
    const isUserNew = useSelector(state => state.tourguid.guid)

    const navigate = useNavigate()
    const [reserve, resResult] =  useMutation(RESERVE_BOOK, {
        onError: (error) => {
          dispatch(createNotification({title: error.graphQLErrors[0].message}))
        },
        refetchQueries: [{query: ME}],
    })

    useEffect(() => {
        if ( resResult.data ) {
            resResult.data && resResult.data.reserveBook ? 
                dispatch(createNotification({title: 'reservation was successful', status: 'success'})) :
                dispatch(createNotification({title: 'something went wrong. Please refersh the page!', status: 'danger'}))
        }
      }, [resResult.data]) // eslint-disable-line

      const reserveBook = (id) => {
        if (!authentication) {
            dispatch(createNotification({title: 'You need to sign in first to reserve a book. Already have an account? ', link: {title: 'click here to sign in', anchor: '/login'}}))
            navigate('/signup')
            return
        }
        reserve({
            variables: {
                id
            }
        })
    }

    const reserveButton = (id) => <div 
                                    className='flex items-center relative' 
                                    onClick={() => {
                                        reserveBook(id)
                                        isUserNew && dispatch(userClicked())
                                        }}>
        <div className='text-sm text-white animate-bounce mt-5 bg-green-500 p-1 rounded drop-shadow-xl cursor-pointer font-[600]'>Reserve Now</div>
        </div>

    return reserveButton
}