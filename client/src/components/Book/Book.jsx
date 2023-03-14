import { useNavigate, useParams } from 'react-router-dom';
import LoadingDetail from '../Loading/LoadingDetail';
import Error from '../Error/Error';
import ErrorId from '../Error/ErrorId';
import { useBook } from '../../hooks/useBook';
import BookDetail from './BookDetail';


const Book = ({token, setNot}) => {
    const navigate = useNavigate()
    const {id} = useParams()

    const data = useBook(id)

if (!token && !data) {
    console.log(token)
    setNot({title: 'You need to sign in to access this page. New to this page? why', link: {title: 'click here to sign up', anchor: '/signup'}})
    navigate('/login')
    return
}

if (data.loading) return <LoadingDetail />
if (data.error) {
    return <Error />
}
if (!data.data.book && !data.loading) {
    console.log(data.book)
    return <ErrorId />
}

    const book = data?.data ? data.data.book  : []
    return ( <BookDetail book={book} setNot={setNot} token={token} /> );
}
 
export default Book;