import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Navigate, useNavigate } from 'react-router-dom';

let PIN = null

const sendEmail = ({name, email, pin}, setNot) => {
emailjs.send("service_lcp53nu","template_1gumj1e",{
    to_name: name,
    ver_num: pin,
    to_email: email,
    },
    'Bgn7EOGkCKW87zLNw')
    .then(() => {
        setNot({title: `Hi ${name}👋.Verification pin was sent to ${email}. Please check your email.`, status: 'success'})
    })
    .catch((e) => {
        setNot({title: `Error happend while sending email message. Are you sure ${email} is your email address? ${e.text}`, status: 'danger'})
    })
}

const generatePin = () => {
    let pin = ''
    for (let i = 0; i < 6; i++) pin += Math.floor(Math.random() * 10)
    return pin
}

const checkValid = (userPin) => {
    return PIN === userPin
}

const Waiting = () =>  <div role='status'>
<span className='inline-block w-3 h-3 bg-blue-600 rounded-full animate-pulse mx-1' />
<span className='inline-block w-3 h-3 bg-blue-600 rounded-full animate-pulse mx-1' />
<span className='inline-block w-3 h-3 bg-blue-600 rounded-full animate-pulse mx-1' />
</div>

const Verifying = () =>  <div role='status'>
<div className='w-9 h-9 bg-transparent rounded-full border-4 border-transparent border-l-black animate-spin' />
</div>

const Failed = () => <div role='status'>
<p className='text-4xl font-[600] text-red-600'>X</p>
</div>

const Success = () => <div role='status'>
    <div className='w-4 h-9 bg-transparent rounded border-4 border-transparent border-r-green-600 border-b-green-600 rotate-45' />
</div>

const Verify = ({setNot, send, form}) => {
    const navigate = useNavigate()
    const signup = useSignup({setNot})
    const [inp, setInp] = useState('')
    const [dis, setDis] = useState(false)
    const [stt, setStt] = useState('waiting')
    useEffect(() => {
        if (inp.length === 6) {
            setDis(true)
            setStt('verifying')
            setTimeout(() => {
                if (checkValid(inp)) {
                    setStt('success')
                    setNot({title: "Verification is completed! Please wait white we create everything for you! It will be ready just in a moment!", status: 'success'})
                    signup({
                        variables: {
                          username: form.username,
                          password: form.password,
                          profession: form.profession
                        }
                      })
            } else {
                setNot({title: 'invalid PIN! Please input the pin number sent to your email account. If you do not find it, you can press resend.'})
                setStt('failed')
                setDis(false)
                setInp('')
            }
            },3000)
        }
    }, [inp]) //disable_eslint_this_line
    
    const reSend = () => {
        PIN = generatePin()
        sendEmail({name: form.username, email: form.email, pin: PIN}, setNot)
    }

    if (!form.email) return navigate('/signup')

    return ( <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center justify-center">
                
                <div className='w-20 h-20'>
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