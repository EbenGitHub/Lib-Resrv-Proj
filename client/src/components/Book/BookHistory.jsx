
const BookHistory = ({book}) => {

    return (
        <div className='bg-white rounded drop-shadow m-5 p-5' key={book.id}>
        <h4 className='text-lg font-[700] pb-5'>{book.title}</h4>
        {
            !book.reservationHistory.length ? <li className='bg-gray-50 rounded-full p-4 my-3 drop-shadow'>You have no reservation history for this book.</li> :
            book.reservationHistory.map(h => <li key={h} className='bg-gray-50 rounded-full p-4 my-3 drop-shadow'>{h}</li>) 
        }
        </div>
    )
}

export default BookHistory