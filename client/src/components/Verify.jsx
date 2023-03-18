import Waiting from './Status/Waiting';
import Verifying from './Status/Verifying';
import Failed from './Status/Failed';
import Success from './Status/Success';
import { useNavigate } from 'react-router-dom';
import { usePin } from '../hooks/usePin';

const Verify = ({form}) => {
    let {stt, reSend, dis, setInp, inp} = usePin({form})
    const navigate = useNavigate()

    if (!form.email) return navigate('/signup')

    return ( <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center justify-center">
                
                <div className='w-20 h-20 ml-9'>
                {
                    stt === 'waiting' ? <Waiting /> :
                    stt === 'verifying' ? <Verifying /> :
                    stt === 'failed' ? <Failed /> :
                    stt === 'success' ? <Success /> : null
                }
                </div>


                <h2>A verification pin was sent to <span className="font-[800] inline-block p-1">{form.email}</span>. Please verify your account!</h2>
                <p> If you could not find it, don't be shy to press Resend button.</p>
                <button className="bg-white drop-shadow hover:bg-gray p-1 rounded m-2" name='sendBtn' id='sendBtn' onClick={reSend}>Resend</button>
                <input className='p-1 rounded-xl pl-2 border-2 border-gray-800' type='number' id='verify' name='vefiry' placeholder="Enter your Pin here" disabled={dis} maxLength='6' value={inp} onChange={({target}) => setInp(target.value)} />
             </div> );
}
 
export default Verify;