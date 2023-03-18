import { useNavigate, useParams } from 'react-router-dom';
import LoadingDetail from '../Loading/LoadingDetail';
import Error from '../Error/Error';
import ErrorId from '../Error/ErrorId';
import { useBook } from '../../hooks/useBook';
import BookDetail from './BookDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createNotification } from '../../reducers/notificationReducer';


const Book = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const dispatch = useDispatch()
    const authentication = useSelector(state => state.authentication)

    const data = useBook(id)


    useEffect(() => {
        if (!authentication && !data) {
            dispatch(createNotification({title: 'You need to sign in to access this page. New to this page? why', link: {title: 'click here to sign up', anchor: '/signup'}}))
            navigate('/login')
            return
        }
    }, []) // eslint-disable-line

    if (data.loading) return <LoadingDetail />
    if (data.error) {
        return <Error />
    }
    if (!data.data.book && !data.loading) {
        return <ErrorId />
    }

    const book = data?.data ? data.data.book  : []
    return ( <BookDetail book={book} /> );
}
 
export default Book;