import { useEffect } from "react"
import { useSelector } from "react-redux"

const FourthTour = ({setTourNum, tourNum}) => {
    const doesUserClicked = useSelector(state => state.tourguid.bClicked)

    useEffect(() => {
        if (doesUserClicked) {
            setTourNum(tourNum + 1)
        }
    }, [doesUserClicked]) //eslint-disable-line
    
    return (
        <>
            <p>
                <span className="inline-block bg-gray-50 hover:bg-white drop-shadow-xl w-auto h-11 pt-2.5 rounded-xl">
                    <span className="inline-block w-3 h-3 bg-yellow-700 rounded-full drop-shadow mx-2"></span>
                    <span className="bg-yellow-300 text-yellow-700 mx-3 rounded drop-shadow-xl px-1">Reserved</span>
                </span>
                , Means you have successfully reserved the book, and you have <span className="bg-white text-cyan-700 px-2 inline-block rounded">2</span> days to take you book from the library.
                <br /> <br /> Let me see you reserve one book.</p>
        </>
    )
}

export default FourthTour