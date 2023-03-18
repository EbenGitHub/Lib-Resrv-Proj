import { useEffect } from "react"

const SixthTour = ({navigate}) => {
    useEffect(() => {
        navigate('/reservations')
    }, []) // eslint-disable-line
    
    return (
        <>
            <p>Here at <span className="bg-gray-900 p-2 rounded-lg drop-shadow-xl">My Reservations</span>, You can see the books you reserved with your reservation history</p>
        </>
    )
}

export default SixthTour