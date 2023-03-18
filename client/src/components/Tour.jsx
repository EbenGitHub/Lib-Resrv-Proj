import Waiting from "./Status/Waiting";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WaitForLogIn from "./Tour/WaitForLogIn";
import FirstTour from "./Tour/FirstTour";
import SecondTour from "./Tour/SecondTour";
import ThirdTour from "./Tour/ThirdTour";
import FourthTour from "./Tour/FourthTour";
import FifthTour from "./Tour/FifthTour";
import SixthTour from "./Tour/SixthTour";
import FinalTour from "./Tour/FinalTour";
import NextButton from "./Tour/NextButton";
import Expore from "./Tour/Explore";
import TryReserve from "./Tour/TryReserve";
import { useDispatch, useSelector } from "react-redux";
import { unguidUser } from "../reducers/tourguidReducer";

const Tour = () => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.authentication)

    const navigate = useNavigate()
    const [tourNum, setTourNum] = useState(1)

    useEffect(() => {
        if (tourNum === TOURS.length - 1) {
            dispatch(unguidUser())
        }
    }, [tourNum]) // eslint-disable-line
    
    const TOURS = [
     <WaitForLogIn />,
     <FirstTour />,
     <Expore />,
     <SecondTour navigate={navigate} />,
     <ThirdTour />,
     <FourthTour setTourNum={setTourNum} tourNum={tourNum} />,
     <FifthTour />,
     <TryReserve />,
     <SixthTour navigate={navigate} />,
     <FinalTour />,
     null
    ]

    return <div className="md:flex hidden bg-cyan-500 z-30 m-5 rounded-xl w-11/12 ml-9 border-2 border-cyan-900 drop-shadow-xl text-white font-[700] mt-20 p-5 fixed flex flex-row items-center justify-between">
        {
            authentication ? <>
                        {
                            TOURS[tourNum]
                        } 
                        <Waiting className='inline ml-3' /> 
                        <NextButton setTourNum={setTourNum} tourNum={tourNum} /> 
                    </> : <>
                        {
                            TOURS[0]
                        }
                        <Waiting className='inline ml-3' />
                    </>
        }
        
        </div>
   }

 
export default Tour;