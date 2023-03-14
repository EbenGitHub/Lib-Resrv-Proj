const Loading = () => {
    return ( 
        <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center">
            {
                [1,2,3,4,5].map((ele) => <div className="bg-white m-2 w-4/5 p-5 rounded drop-shadow" key={ele}>
                    <div className='flex justify-between items-center md:items-stretch flex-col md:flex-row'>
                <div className='flex md:w-2/6 w-5/6 bg-gray-50 rounded-full'>
                    <div className='hidden md:block w-20 bg-gray-300 animate-pulse h-20 rounded '><p className='text-black text-center'></p> </div>
                    <span className='pt-3 md:mb-0 ml-4 bg-gray-200 inline-block h-3 rounded w-28 animate-pulse'></span>
                </div>

                <div className='md:w-2/5 w-4/5 text-white text-center bg-gray-600 md:p-1 p-3 md:m-0 m-3 rounded-xl drop-shadow-xl animate-pulse'>
                    <span className='mt-3 ml-3 bg-white inline-block h-2 rounded w-10/12'></span>
                    <span className='mt-3 ml-3 bg-white inline-block h-2 rounded w-4/12 md:block hidden'></span>
                </div>
                <div className='bg-white h-full'>

                <div className='flex items-center animate-pulse'>
                     <span className='h-3 w-3 bg-gray-700 rounded-full inline-block border-1 border-gray-300 border-dotted shadow-xl pt-2 drop-shadow-lg'></span>
                     <div className='ml-5 text-sm bg-gray-100 rounded p-1 font-[500]  drop-shadow-sm w-14'><span className='mt-3 ml-3 bg-white inline-block h-2 rounded w-9'></span></div>
                 </div> 

                 <div className='flex items-center relative'>
                     <div className='text-sm text-white animate-pulse mt-5 bg-gray-500 p-1 rounded drop-shadow-lg '><span className='mt-3 ml-3 bg-white inline-block h-2 rounded w-9'></span></div>
                 </div>

                </div>
            </div>
            </div>
            )
            }
        </div>
     );
}
 
export default Loading;