
export const reservedTag = <div className='flex items-center'>
<span className='h-3 w-3 bg-yellow-600 rounded-full inline-block border-1 border-yellow-300 border-dotted shadow-xl pt-2  drop-shadow-lg'></span>
<p className='ml-5 text-sm bg-yellow-100 rounded p-1 text-yellow-700 font-[500]'>Reserved</p>
</div>

export const availableTag = <div className='flex items-center'>
<span className='h-3 w-3 bg-green-700 rounded-full inline-block border-1 border-green-300 border-dotted shadow-xl pt-2 drop-shadow-lg'></span>
<p className='ml-5 text-sm bg-green-100 rounded p-1 text-green-700 font-[500]  drop-shadow-sm'>Available</p>
</div>

export const unavailableTag = <div className='flex items-center'>
<span className='h-3 w-3 bg-red-700 rounded-full inline-block border-1 border-red-300 border-dotted shadow-xl pt-2  drop-shadow-lg'></span>
<p className='ml-5 text-sm bg-red-100 rounded p-1 text-red-700 font-[500]'>Not available</p>
</div>

// export const reserveButton = (id) => <div className='flex items-center relative' onClick={() => reserveBook(id)}>
// <div className='text-sm text-white animate-bounce mt-5 bg-green-500 p-1 rounded drop-shadow-xl cursor-pointer font-[600]'>Reserve Now</div>
// </div>

// export const releaseButton = (id) => <div className='flex items-center relative' onClick={() => releaseBook(id)}>
// <div className='text-sm text-white mt-5 bg-rose-500 p-1 rounded drop-shadow-xl cursor-pointer'>Release Book</div>
// </div>
