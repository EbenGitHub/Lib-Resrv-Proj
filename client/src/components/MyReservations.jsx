import {ME} from '../gql/queries'
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading/Loading';
import Error from './Error/Error';
import BookDetail from './Book/BookDetail';

const MyReservations = ({token, setNot}) => {
    const navigate = useNavigate()
    const data = useQuery(ME)

if (!token && data) {
    console.log(token)
    setNot({title: 'You need to sign in to access this page. New to this page? why', link: {title: 'click here to sign up', anchor: '/signup'}})
    navigate('/login')
    return
}
if (data.loading) return <Loading />
if (data.error) return <Error />

    const books = data?.data?.me?.username && data.data.me.reservedBooks ? data.data.me.reservedBooks : []
    return <BookDetail books={books} me={data.data.me.username} setNot={setNot} token={token} /> 
}
 
export default MyReservations;