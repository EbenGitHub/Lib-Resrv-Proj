const NextButton = ({setTourNum, tourNum}) => {
    return <span className="inline-block bg-white p-2 rounded text-cyan-900 drop-shadow-xl cursor-pointer hover:bg-cyan-50" onClick={() => setTourNum(tourNum + 1)} >Next</span>
}

export default NextButton