import { useReserve } from '../../hooks/useReserve';
import { useRelease } from '../../hooks/useRelease';
import { reservedTag, availableTag, unavailableTag } from '../../utils/theme';
import icon from '../../assets/book-solid.svg'
import { Link } from 'react-router-dom';

const BookFragment = ({book}) => {
    
    const reserveButton = useReserve()
    const releaseButton = useRelease()

    return (<div key={book.id} className=" relative bg-white m-2 w-4/5 p-5 rounded drop-shadow">
    <div className='flex justify-between items-center md:items-stretch flex-col md:flex-row'>
        <Link to={`/books/${book.id}`} className=' flex md:w-2/6 w-5/6 bg-gray-50 rounded-full'>
            <div className='w-auto px-2 bg-gray-200 h-20 rounded drop-shadow hidden md:block'><p className='text-black text-center'>ላyብRaሪ</p> <img src={icon} className='w-9 h-9 m-1 text-white ml-5' alt=''/></div>
            <div className='relative overflow-hidden'>
                <h3 className='pt-3 md:mb-0 mb-3 ml-4 font-[700] text-xl'>{book.title}</h3>
            </div>
        </Link>
        
        <Link to={`/books/${book.id}`} className={`md:w-2/5 w-4/5 text-white text-center md:p-1 p-3 md:m-0 m-3 rounded-xl drop-shadow-xl ${book.expired?.isExpired ? ' bg-yellow-500' : !book.expired && !book.available ? 'bg-rose-500' : !book.expired?.isExpired && !book.available ? 'bg-green-500' : 'bg-blue-500'}`}>
        {
             book.expired ? (book.expired.isExpired ? <p className='text-black font-[500]'>Your book expired {parseInt(book.expired.expiryDate) * -1} {book.expired.timeFormate} ago. Reserve again</p> : <>
             <p>Your book is reserved! You have {book.expired.expiryDate} {book.expired.timeFormate} to take your books from the library</p>
             </> ) : (book.available ? <p>This book is available for reservation</p> : <p>This book is not available for reservation</p>)
         }
        </Link>
        
        <div className='bg-white h-full'>
         {
             book.available ? availableTag : (book.expired ? reservedTag : unavailableTag)
         }
         {
             book.available ? reserveButton(book.id) : (book.expired ? releaseButton(book.id) : null)
         }
        </div>
    </div>
    <p className=' pt-2 ml-4 font-[500] text-gray-500 text-sm '>By {book.author}</p>
    </div>)
}

export default BookFragment