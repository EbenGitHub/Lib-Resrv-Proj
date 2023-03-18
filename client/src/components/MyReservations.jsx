import {ME} from '../gql/queries'
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading/Loading';
import Error from './Error/Error';
import BookDetail from './Book/BookDetail';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';

const MyReservations = () => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.authentication)

    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    const data = useQuery(ME)

    useEffect(() => {
        if (!authentication) {
            setShow(true)
        }
    }, []) //eslint-disable-line

    useEffect(() => {
        if (!authentication && show) {
            dispatch(createNotification({title: 'You need to sign in to access this page. New to this page? why', link: {title: 'click here to sign up', anchor: '/signup'}}))
            console.log(authentication)
            navigate('/login')
            return
        }
    }, [show]) //eslint-disable-line
    

if (data.loading) return <Loading />
if (data.error) return <Error />

    const books = data?.data?.me?.username && data.data.me.reservedBooks ? data.data.me.reservedBooks : []
    return <BookDetail books={books} me={data.data.me.username} /> 
}
 
export default MyReservations;