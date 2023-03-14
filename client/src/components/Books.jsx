import {ALL_BOOKS, ME} from '../gql/queries'
import { MY_BOOKS } from '../gql/fragments';
import {RESERVE_BOOK, RELEASE_BOOK} from '../gql/mutations'
import {BOOK_RESERVED, BOOK_RELEASED} from '../gql/subscriptions'
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import icon from '../assets/book-solid.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from './Loading/Loading';
import Error from './Error/Error';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import BookDetail from './Book/BookDetail';

const Userid = localStorage.getItem('library-user-id')

const isItMe = (id) => {
    return Userid === id
}

const Books = ({token, setNot}) => {

    const navigate = useNavigate()

    const data = useQuery(ALL_BOOKS)

    useSubscription(BOOK_RESERVED, {
        onData: ({ data, client }) => {
          const reservedBook = data.data.bookReserved    
          client.cache.updateQuery({ query: ALL_BOOKS }, ({ books }) => {
            return {
                books: isItMe(reservedBook.reservedBy.id) ? books : books.map(b => {
                    if (b.id === reservedBook.id) {
                        return {...reservedBook, expired: null, reservationHistory: b.reservationHistory}
                    } else return b
                }),
            }
          })
        }
      })

    useSubscription(BOOK_RELEASED, {
        onData: ({ data, client }) => {
          const releasedBook = data.data.bookReleased    
          client.cache.updateQuery({ query: ALL_BOOKS }, ({ books }) => {
            return {
                books: isItMe(releasedBook.reservedBy.id) ? books : books.map(b => {
                    if (b.id === releasedBook.id) {
                        return {...releasedBook, expired: null, reservationHistory: b.reservationHistory}
                    } else return b
                }),
            }
          })
        }
      })

    if (data.loading) return <Loading />
    if (data.error) return <Error />

    const books = data.data && data.data.books ? data.data.books : []

    return <BookDetail books={books} noHistory setNot={setNot} token={token} /> 
}
 
export default Books;