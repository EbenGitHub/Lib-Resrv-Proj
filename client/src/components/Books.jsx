import {ALL_BOOKS, ME} from '../gql/queries'
import { MY_BOOKS } from '../gql/fragments';
import {RESERVE_BOOK, RELEASE_BOOK} from '../gql/mutations'
import {BOOK_RESERVED, BOOK_RELEASED} from '../gql/subscriptions'
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import icon from '../assets/book-solid.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';

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

    const [reserve, resResult] = useMutation(RESERVE_BOOK, {
        onError: (error) => {
          setNot({title: error.graphQLErrors[0].message, status: 'danger'})
        },
        refetchQueries: [{query: ME}],
    //     update: (cache, response) => {
    //         // console.log(response.data.reserveBook, 'this ws rerv')
    //         //   cache.updateQuery({ query: ALL_BOOKS}, ({ books }) => {
    //         //   return {
    //         //     books: books.map(b => {
    //         //         if (b.id === response.data.reserveBook.id) {
    //         //             return response.data.reserveBook
    //         //         } else {
    //         //             return b
    //         //         }
    //         //     }),
    //         //   }
    //         // })
    //     //     cache.updateQuery({ query: ME}, ({ me }) => {
    //     //         console.log('trying to update')
    //     //         return {
    //     //         me: {...me, reservedBooks: me.reservedBooks.map(b => {
    //     //             if (b.id === response.data.reserveBook.id) {
    //     //                 console.log('found here')
    //     //                 return response.data.reserveBook
    //     //             } else {
    //     //                 return b
    //     //             }
    //     //         }), reservedBookCounts: me.reservedBookCounts + 1},
    //     //         }
    //     //     })
    //     // console.log('tying to concat', response.data.reserveBook)
    // //     cache.updateQuery({ query: ME}, ({ me }) => {
    // //     return {
    // //     me: {...me, reservedBooks: me.reservedBooks.concat(response.data.reserveBook), reservedBookCounts: me.reservedBookCounts + 1},
    // //     }
    // // })
    // // cache.updateQuery({ query: gql`
    // // query {
    // //     book(id: "${response.data.reserveBook.id}") {
    // //         ...MyBooks
    // //     }
    // //     }
        
    // //     ${MY_BOOKS}
    // //     `}, ({ book }) => {
    // //     return {
    // //     book: response.data.reserveBook,
    // //     }
    // // })
    //       },
    })
    
    const [release, relResult] = useMutation(RELEASE_BOOK, {
        onError: (error) => {
            setNot({title: error.graphQLErrors[0].message, status: 'danger'})
        },
        refetchQueries: [{query: ME}],
        // update: (cache, response) => {
        // //     cache.updateQuery({ query: ALL_BOOKS}, ({ books }) => {
        // //     return {
        // //       books: books.map(b => {
        // //           if (b.id === response.data.releaseBook.id) {
        // //               return response.data.releaseBook
        // //           } else {
        // //               return b
        // //           }
        // //       }),
        // //     }
        // //   })
        // // cache.updateQuery({ query: ME}, ({ me }) => {
        // //     return {
        // //     me: {...me, reservedBooks: me.reservedBooks.map(b => {
        // //         if (b.id === response.data.releaseBook.id) {
        // //             return response.data.releaseBook
        // //         } else {
        // //             return b
        // //         }
        // //     }), reservedBookCounts: me.reservedBookCounts - 1},
        // //     }
        // // })
        // // cache.updateQuery({ query: ME}, ({ me }) => {
        // //     return {
        // //     me: {...me, reservedBooks: me.reservedBooks.filter(b => b.id !== response.data.reserveBook.id), reservedBookCounts: me.reservedBookCounts - 1},
        // //     }
        // // })
        // //     cache.updateQuery({ query: gql`
        // //     query {
        // //         book(id: "${response.data.releaseBook.id}") {
        // //         ...MyBooks
        // //         }
        // //     }
            
        // //     ${MY_BOOKS}
        // //     `}, ({ book }) => {
        // //         return {
        // //         book: response.data.releaseBook,
        // //         }
        // //     })
        // },
      })

    useEffect(() => {
        if ( relResult.data ) {
            relResult.data && relResult.data.releaseBook ? 
                setNot({title: 'releasing the book was successful', status: 'success'}) : 
                setNot({title: 'something went wrong', status: 'danger'})
        }
      }, [relResult.data]) // eslint-disable-line

    useEffect(() => {
        if ( resResult.data ) {
            resResult.data && resResult.data.reserveBook ? 
                setNot({title: 'reservation was successful', status: 'success'}) : 
                setNot({title: 'something went wrong', status: 'danger'})
        }
      }, [resResult.data]) // eslint-disable-line

    const reserveBook = (id) => {
        if (!token) {
            setNot({title: 'You need to sign in first to reserve a book. Already have an account? ', link: {title: 'click here to sign in', anchor: '/login'}})
            navigate('/signup')
            return
        }
        reserve({
            variables: {
                id
            }
        })
    }

    const releaseBook = (id) => {
        if (!token) {
            setNot({title: 'You need to sign in first to reserve a book. Already have an account? ', link: {title: 'click here to sign in', anchor: '/login'}})
            navigate('/signup')
            return
        }
        release({
            variables: {
                id
            }
        })
    }

    const reservedTag = <div className='flex items-center'>
    <span className='h-3 w-3 bg-yellow-600 rounded-full inline-block border-1 border-yellow-300 border-dotted shadow-xl pt-2  drop-shadow-lg'></span>
    <p className='ml-5 text-sm bg-yellow-100 rounded p-1 text-yellow-700 font-[500]'>Reserved</p>
</div>

    const availableTag = <div className='flex items-center'>
    <span className='h-3 w-3 bg-green-700 rounded-full inline-block border-1 border-green-300 border-dotted shadow-xl pt-2 drop-shadow-lg'></span>
    <p className='ml-5 text-sm bg-green-100 rounded p-1 text-green-700 font-[500]  drop-shadow-sm'>Available</p>
</div>

    const unavailableTag = <div className='flex items-center'>
    <span className='h-3 w-3 bg-red-700 rounded-full inline-block border-1 border-red-300 border-dotted shadow-xl pt-2  drop-shadow-lg'></span>
    <p className='ml-5 text-sm bg-red-100 rounded p-1 text-red-700 font-[500]'>Not available</p>
</div>

const reserveButton = (id) => <div className='flex items-center relative' onClick={() => reserveBook(id)}>
<div className='text-sm text-white animate-bounce mt-5 bg-green-500 p-1 rounded drop-shadow-xl cursor-pointer font-[600]'>Reserve Now</div>
</div>

const releaseButton = (id) => <div className='flex items-center relative' onClick={() => releaseBook(id)}>
<div className='text-sm text-white mt-5 bg-rose-500 p-1 rounded drop-shadow-xl cursor-pointer'>Release Book</div>
</div>

    if (data.loading) return <Loading />
    if (data.error) return <Error />

    const books = data.data && data.data.books ? data.data.books : []

    return ( 
        <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center">
            {
                books.map(b => <div to='/' key={b.id} className="bg-white m-2 w-4/5 p-5 rounded drop-shadow">
                   <div className='flex justify-between'>
                       <Link to={`/books/${b.id}`}  className='flex w-2/6 bg-gray-50 rounded-full'>
                           <div className='w-20 bg-gray-200 h-20 rounded drop-shadow'><p className='text-black text-center'>ላyብRaሪ</p> <img src={icon} className='w-9 h-9 m-1 text-white ml-5' /></div>
                           <h3 className='pt-3 ml-4 font-[700] text-xl'>{b.title}</h3>
                       </Link>
                       <Link to={`/books/${b.id}`} className='w-2/5 bg-sky-500 text-white text-center p-1 rounded-xl drop-shadow-xl flex flex-col justify-evenly'>
                       {
                            b.expired ? (b.expired.isExpired ? <p>Your book expired {parseInt(b.expired.expiryDate) * -1} {b.expired.timeFormate} ago. Reserve again</p> : <>
                            <p>You have {b.expired.expiryDate} {b.expired.timeFormate} to take your books from the library</p>
                            </> ) : (b.available ? <p>This book is available for reservation</p> : <p>This book is not available for reservation</p>)
                        }
                       </Link>
                       <div className='bg-white h-full'>
                        {
                            b.available ? availableTag : (b.expired ? reservedTag : unavailableTag)
                        }
                        {
                            b.available ? reserveButton(b.id) : (b.expired ? releaseButton(b.id) : null)
                        }
                       </div>
                   </div>
                </div>)
            }
        </div>
     );
}
 
export default Books;