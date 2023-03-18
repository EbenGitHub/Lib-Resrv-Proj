import {ME} from '../gql/queries'
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading/Loading';
import Error from './Error/Error';
import BookDetail from './Book/BookDetail';
import { useEffect } from 'react';

const MyReservations = ({token, setNot}) => {
    const navigate = useNavigate()
    const data = useQuery(ME)

    useEffect(() => {
        if (!token) {
            setNot({title: 'You need to sign in to access this page. New to this page? why', link: {title: 'click here to sign up', anchor: '/signup'}})
            console.log(token)
            navigate('/login')
            return
        }
        // if (!token && data) {
        //     setNot({title: 'You need to sign in to access this page. New to this page? why', link: {title: 'click here to sign up', anchor: '/signup'}})
        //     console.log(token)
        //     navigate('/login')
        //     return
        // }
    }, [token, data])

if (data.loading) return <Loading />
if (data.error) return <Error />

    const books = data?.data?.me?.username && data.data.me.reservedBooks ? data.data.me.reservedBooks : []
    return <BookDetail books={books} me={data.data.me.username} setNot={setNot} token={token} /> 
}
 
export default MyReservations;