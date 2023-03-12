import img1 from '../assets/library.webp'
import img2 from '../assets/book.webp'
import img3 from '../assets/phone.webp'

import { useNavigate } from 'react-router-dom/dist'

const Landing = () => {
    const navigate = useNavigate()
    return ( 
        <div className="bg-blue-50 min-w-screen py-40 min-h-screen overflow-x-hidden p-10">
            <div className='h-screen mb-20'>
                <h1 className='text-5xl font-[700] text-black p-4 mb-9'>Find a book for your soul using
                    <span className='text-blue-900 m-4 text-6xl ml-9'>ላyብRaሪ</span></h1>
                <img src={img1} className="h-2/3 rounded shadow" />
            </div>
            <div className='h-screen mb-20'>
                <h2 className='text-5xl font-[700] text-black p-4 mb-9'>Don't go to a  library doubting if the book you want exists. </h2>
                <img src={img2} className="h-2/3 rounded shadow" />
            </div>
            <div className='h-screen mb-20'>
                <h2 className='text-5xl font-[700] text-black p-4 mb-9'>Reserve a book at your home and pick when you are available. </h2>
                <img src={img3} className="h-2/3 rounded shadow" />
            </div>
            <div className='flex justify-center pt-20'>
                <button className='text-4xl bg-blue-600 rounded font-[700] text-white p-4 mb-20' onClick={() => navigate('/signup')}>Sign Up today. </button>
            </div>
        </div>
     );
}
 
export default Landing;