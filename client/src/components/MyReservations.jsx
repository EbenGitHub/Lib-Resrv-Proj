import {ME} from '../gql/queries'
import { useQuery } from '@apollo/client';
import icon from '../assets/book-solid.svg'

const MyReservations = () => {
    const data = useQuery(ME, {
        variables: {
            title: ''
        }
    })

    const reservedTag = <div className='flex items-center'>
    <span className='h-3 w-3 bg-yellow-700 rounded-full inline-block border-1 border-yellow-300 border-dotted shadow-xl pt-2  drop-shadow-lg'></span>
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

    const reserveButton = <div className='flex items-center relative'>
    <div className='text-sm text-white animate-bounce mt-5 bg-green-500 p-1 rounded drop-shadow-xl cursor-pointer font-[600]'>Reserve Now</div>
</div>

    const releaseButton = <div className='flex items-center relative'>
    <div className='text-sm text-white mt-5 bg-rose-500 p-1 rounded drop-shadow-xl cursor-pointer'>Release Book</div>
</div>

    if (data.loading) return <p>Loading</p>

    const books = data?.data?.me?.username && data.data.me.reservedBooks ? data.data.me.reservedBooks : []
    return ( 
        <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center">
            <h2 className='text-xl font-[700] mb-9 text-cyan-900 '>Hi <span className='bg-gray-50 text-gray-700 p-2 rounded-full text-3xl mx-2'>{data.data.me.username}</span>. These are your reservations</h2>
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
                            b.available ? reserveButton : (b.expired ? releaseButton : null)
                        }
                       </div>
                   </div>
                </div>)
            }
            <div className='mt-20 bg-blue-50 w-11/12 rounded-xl drop-shadow-lg p-5 m-5'>
                <h3 className=' p-5 rounded-full text-2xl text-gray-600 font-[800]'>Your Reservation History</h3>
                <ul>
                    {
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