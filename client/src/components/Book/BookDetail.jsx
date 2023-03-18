import BookFragment from "./BookFragment";
import BookHistory from "./BookHistory";

const BookDetail = ({noHistory, me, books, book}) => {

    if (books) {
        return ( <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center">
                    {
                        me ? <h2 className='text-xl font-[700] mb-9 text-white bg-cyan-500 p-3 rounded '>Hi {me}. These are your reservations</h2> : null
                    }
                    {
                        books.map(b => <BookFragment book={b} key={b.id}/>)
                    }
                    {
                        noHistory ? null : 
                        <div className='mt-20 bg-blue-50 w-11/12 rounded-xl drop-shadow-lg p-5 m-5'>
                            <h3 className=' p-5 rounded-full text-2xl text-gray-600 font-[800]'>Your Reservation History</h3>
                            <ul>
                                {
                                    !books.length ? <p className='bg-gray-50 rounded-full p-4 my-3 drop-shadow'>You have no reservation history.</p> : 
                                    books.map(b => {
                                        return <BookHistory book={b} key={b.id} />
                                    })
                                }
                            </ul>
                        </div> 
                    }
                </div>)
    }

    return ( <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center">
                <BookFragment book={book} />
                <div className='mt-20 bg-blue-50 w-11/12 rounded-xl drop-shadow-lg p-5 m-5'>
                    <h3 className=' p-5 rounded-full text-2xl text-gray-600 font-[800]'>Your Reservation History</h3>
                    <ul>
                        <BookHistory book={book} />
                    </ul>
                </div>
              </div> );
}
 
export default BookDetail;