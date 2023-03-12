import {ALL_BOOKS, ME} from '../gql/queries'
import {RESERVE_BOOK, RELEASE_BOOK} from '../gql/mutations'
import { useQuery, useMutation } from '@apollo/client';
import icon from '../assets/book-solid.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from './Loading';

const MyReservations = ({token, setNot}) => {
    const navigate = useNavigate()
    const data = useQuery(ME)

    const [reserve, resResult] = useMutation(RESERVE_BOOK, {
        onError: (error) => {
          setNot({title: error.graphQLErrors[0].message})
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
            setNot({title: error.graphQLErrors[0].message})
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
        if (!token) {
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

    const books = data?.data?.me?.username && data.data.me.reservedBooks ? data.data.me.reservedBooks : []
    return ( 
        <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center">
            <h2 className='text-xl font-[700] mb-9 text-white bg-cyan-500 p-3 rounded '>Hi {data.data.me.username}. These are your reservations</h2>
            {
                books.map(b => <div key={b.id} className="bg-white m-2 w-4/5 p-5 rounded drop-shadow">
                   <div className='flex justify-between'>
                       <div className='flex w-2/6 bg-gray-50 rounded-full'>
                           <div className='w-20 bg-gray-200 h-20 rounded drop-shadow'><p className='text-black text-center'>ላyብRaሪ</p> <img src={icon} className='w-9 h-9 m-1 text-white ml-5' /></div>
                           <h3 className='pt-3 ml-4 font-[700] text-xl'>{b.title}</h3>
                       </div>
                       <div className={`w-2/5 text-white text-center p-1 rounded-xl drop-shadow-xl ${b.expired?.isExpired ? ' bg-yellow-500' :  'bg-green-500'}`}>
                       {
                            b.expired ? (b.expired.isExpired ? <p className='text-black font-[500]'>Your book expired {parseInt(b.expired.expiryDate) * -1} {b.expired.timeFormate} ago. Reserve again</p> : <>
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
            <div className='mt-20 bg-blue-50 w-11/12 rounded-xl drop-shadow-lg p-5 m-5'>
                <h3 className=' p-5 rounded-full text-2xl text-gray-600 font-[800]'>Your Reservation History</h3>
                <ul>
                    {
                        !books.length ? <p className='bg-gray-50 rounded-full p-4 my-3 drop-shadow'>You have no reservation history.</p> : 
                        books.map(b => {
                            return <div className='bg-white rounded- drop-shadow m-5 p-5'>
                            <h4 className='text-lg font-[700] pb-5'>{b.title}</h4>
                            {
                                !b.reservationHistory.length ? <li className='bg-gray-50 rounded-full p-4 my-3 drop-shadow'>You have no reservation history for this book.</li> :
                                b.reservationHistory.map(h => <li className='bg-gray-50 rounded-full p-4 my-3 drop-shadow'>{h}</li>) 
                            }
                            </div>
                        })
                    }
                </ul>
            </div>
        </div>
     );
}
 
export default MyReservations;