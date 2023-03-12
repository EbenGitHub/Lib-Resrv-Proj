import {ALL_BOOKS, ME} from '../gql/queries'
import {RESERVE_BOOK, RELEASE_BOOK} from '../gql/mutations'
import {BOOK_RESERVED, BOOK_RELEASED} from '../gql/subscriptions'
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import icon from '../assets/book-solid.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from './Loading';

const checkForRes = (books, book) => {
    let exist = false
    books.map(b => {
        if (b.id === book.id && !b.available) {
            exist ||= b.reservedBy.id === book.reservedBy.id
        } else {
            exist ||= false
        }
    })
    return exist
}

const checkForRel = (books, book) => {
    let exist = false
    books.map(b => {
        if (b.id === book.id && b.available) {
            exist ||= true
        } else if (b.id === book.id && !b.available) {
            exist ||= false
        } else {
            exist ||= false
        }
    })
    console.log('check', exist)
    return exist
}

const Books = ({token, setNot}) => {

    const navigate = useNavigate()

    const data = useQuery(ALL_BOOKS, {
        variables: {
            title: ''
        }
    })

    useSubscription(BOOK_RESERVED, {
        onData: ({ data, client }) => {
          const reservedBook = data.data.bookReserved    
          client.cache.updateQuery({ query: ALL_BOOKS }, ({ books }) => {
            console.log('this is the book', books)
            return {
                books: checkForRes(books, reservedBook) ? books : books.map(b => {
                    if (b.id === reservedBook.id) {
                        return reservedBook
                    } else return b
                }),
            }
          })
        }
      })

    useSubscription(BOOK_RELEASED, {
        onData: ({ data, client }) => {
          const releasedBook = data.data.bookReleased
          console.log(releasedBook)
    
          client.cache.updateQuery({ query: ALL_BOOKS }, ({ books }) => {
            console.log('this is the book', books)
            return {
                books: checkForRel(books, releasedBook) ? books : books.map(b => {
                    if (b.id === releasedBook.id) {
                        return {...b, available: true, reserved: false}
                    } else return b
                }),
            }
          })
        }
      })

    const [reserve, resResult] = useMutation(RESERVE_BOOK, {
        onError: (error) => {
          console.log(error.graphQLErrors[0].message)
        },
        update: (cache, response) => {
              cache.updateQuery({ query: ALL_BOOKS}, ({ books }) => {
              return {
                books: books.map(b => {
                    if (b.id === response.data.reserveBook.id) {
                        return response.data.reserveBook
                    } else {
                        return b
                    }
                }),
              }
            })
          },
    })
    
    const [release, relResult] = useMutation(RELEASE_BOOK, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        },
        update: (cache, response) => {
            cache.updateQuery({ query: ALL_BOOKS}, ({ books }) => {
            return {
              books: books.map(b => {
                  if (b.id === response.data.releaseBook.id) {
                      return response.data.releaseBook
                  } else {
                      return b
                  }
              }),
            }
          })
        },
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
        console.log(id)
        if (!token) {
            navigate('/signup')
            return
        }
        reserve({
            variables: {
                id
            }
        })
        // resResult.data && resResult.data.reserveBook ? setNot({title: 'reservation was successful', status: 'success'}) : setNot({title: 'something went wrong', status: 'danger'})
        // console.log(resResult.data)
    }

    const releaseBook = (id) => {
        console.log(id)
        if (!token) {
            navigate('/signup')
            return
        }
        release({
            variables: {
                id
            }
        })
        // relResult.data?.reserveBook ? setNot({title: 'releasing the book was successful', status: 'success'}) : setNot({title: 'something went wrong', status: 'danger'})
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

    // console.log(data?.data?.books)

    if (data.loading) return <Loading />

    const books = data.data && data.data.books ? data.data.books : []
    return ( 
        <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center">
            {
                books.map(b => <div key={b.id} className="bg-white m-2 w-4/5 p-5 rounded drop-shadow">
                   <div className='flex justify-between'>
                       <div className='flex w-2/6 bg-gray-50 rounded-full'>
                           <div className='w-20 bg-gray-200 h-20 rounded drop-shadow'><p className='text-black text-center'>ላyብRaሪ</p> <img src={icon} className='w-9 h-9 m-1 text-white ml-5' /></div>
                           <h3 className='pt-3 ml-4 font-[700] text-xl'>{b.title}</h3>
                       </div>
                       <div className='w-2/5 bg-sky-500 text-white text-center p-1 rounded-xl drop-shadow-xl'>
                       {
                            b.expired ? (b.expired.isExpired ? <p>Your book expired {parseInt(b.expired.expiryDate) * -1} {b.expired.timeFormate} ago. Reserve again</p> : <>
                            <p>You have {b.expired.expiryDate} {b.expired.timeFormate} to take your books from the library</p>
                            </> ) : (b.available ? <p>This book is available for reservation</p> : <p>This book is not available for reservation</p>)
                        }
                       </div>
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