import { useState } from "react"

export const useSearch = () => {
    const [val, setVal] = useState(null)

    const Search = () => {
        return (
            <div className="bg-blue-100 pt-40 flex flex-col items-center">
                <input autoFocus type="text" onChange={({target}) => setVal(target.value)} value={val} className='bg-gray-50 rounded-xl w-3/12 p-1 pl-3 border-2 border-blue-200' placeholder='Search for books here...' />
            </div>
        )
    }

    return {Search, val}
}