import { useEffect } from "react"

const SecondTour = ({navigate}) => {
    useEffect(() => {
        navigate('/books')
    }, []) // eslint-disable-line
    
    return (
        <>
            <p>Here at <span className="bg-gray-900 p-2 rounded-lg drop-shadow-xl">Books</span>, You can see the books availability, reserve books, or cancel your book reservation</p>
        </>
    )
}

export default SecondTour