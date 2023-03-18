import img1 from '../assets/library.webp'
import img2 from '../assets/book.webp'
import img3 from '../assets/phone.webp'

import { Link } from 'react-router-dom'

const Landing = () => {
    return ( 
        <div className="bg-blue-50 min-w-screen py-40 min-h-screen overflow-x-hidden p-10">
            <div className='md:h-screen mb-20 flex flex-col md:flex-row-reverse bg-white rounded-xl'>
               <div className='h-2/12 bg-gray-100 w-1/12 m-3 rounded-lg hidden md:block'></div>
               <div className='h-2/12 bg-gray-100 w-1/12 m-3 rounded-lg hidden md:block'></div>
               <div className='h-2/12 bg-gray-100 w-1/12 m-3 rounded-lg hidden md:block'></div>
               <div className="md:w-7/12 m-8 rounded-lg self-start">
                    <img src={img1} className='rounded-lg' alt='img' />
                    <h2 className='md:text-4xl text-3xl font-[700] text-gray-700 p-4 mb-9'>Reserve a book at your finger tip</h2>
                    <p className='text-gray-500 md:text-3xl text-2xl pl-5 pb-6'>የሚፈልጉትን መጽሃፍት በእጆ ካለው ስልክ ሪዘርቭ ያድርጉ</p>
                </div>
            </div>
            <div className='md:h-screen mb-20 flex flex-row bg-white rounded-xl'>
               <div className='h-2/12 bg-gray-100 w-1/12 m-3 rounded-lg hidden md:block'></div>
               <div className='h-2/12 bg-gray-100 w-1/12 m-3 rounded-lg hidden md:block'></div>
               <div className='h-2/12 bg-gray-100 w-1/12 m-3 rounded-lg hidden md:block'></div>
               <div className="md:w-8/12 ml-5 rounded-lg md:self-start">
                    <h2 className='md:text-4xl text-3xl font-[700] text-black p-4 md:mb-9'>Don't go to a library doubting if the book you want will be available</h2>
                    <div className='flex md:flex-row-reverse flex-col'>
                        <p className='md:text-3xl text-2xl font-[700] text-gray-500 p-4 md:m-5 md:w-4/12'>የትም መሄድ ሳይጠበቅቦት እዛው ባሉበት ለማንበብ መጽሃፎን በተጠባባቂ ያስቀምጡ </p>
                        <img src={img2} className='rounded-2xl w-8/12 p-2 md:p-0' alt='img' />
                    </div>
                </div>
            </div>
            <div className='md:h-screen mb-20 flex md:flex-row-reverse flex-col-reverse bg-white rounded-xl'>
               <div className='md:h-2/12 bg-blue-100 md:w-3/12 m-3 rounded-lg flex justify-center items-center'>
                       <button className='md:text-4xl text-3xl bg-cyan-800 animate-bounce rounded-2xl drop-shadow-lg font-[700] text-white p-4 md:mb-20 mt-9'>
                           <Link to='/signup'>Sign Up today. </Link>
                       </button>
               </div>
               <div className="md:w-8/12 md:p-0 p-4 md:ml-5 rounded-lg self-start">
               <h2 className='md:text-4xl text-3xl font-[700] text-black p-4 md:mb-9'>Reserve a book at your home and pick it when you are available</h2>
                    <div className='flex md:flex-row-reverse flex-col'>
                        <p className='md:text-3xl text-2xl font-[700] text-gray-500 p-4 md:m-5 md:w-4/12'>ታዲያ ምን ይተብቃሉ። እዚህ ጋ ያለውን መስፈንጠሪያ በመንካት አሁኑኑ መጽሃፎን ረዘርቭ ያድርጉ</p>
                        <img src={img3} className='rounded-lg md:w-8/12' alt='img' />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Landing;