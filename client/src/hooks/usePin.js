import { useEffect, useState } from 'react';
import { useSignup } from './useSignup';
import sendEmail from '../utils/sendemail';
import generatePin from '../utils/generatepin';
import checkValid from '../utils/check';

let PRIVATE_PIN = null

export const usePin = ({setNot, form, setIsUserNew}) => {

    const signup = useSignup({setNot})
    const [inp, setInp] = useState('')
    const [dis, setDis] = useState(false)
    const [stt, setStt] = useState('waiting')

    useEffect(() => {
        if (inp.length === 6) {
            setDis(true)
            setStt('verifying')
            setTimeout(() => {
                if (checkValid(PRIVATE_PIN, inp)) {
                    setStt('success')
                    setNot({title: "Verification is completed! Please wait white we create everything for you! It will be ready just in a moment!", status: 'success'})
                    signup({
                        variables: {
                          username: form.username,
                          email: form.email,
                          password: form.password,
                          profession: form.profession
                        }
                      })
                    setIsUserNew(true)
            } else {
                setNot({title: 'invalid PIN! Please input the pin number sent to your email account. If you do not find it, you can press resend.'})
                setStt('failed')
                setDis(false)
                setInp('')
            }
            },3000)
        }
    }, [inp]) // eslint-disable-line

    useEffect(() => {
        reSend()
    }, []) // eslint-disable-line
    
    const reSend = () => {
        PRIVATE_PIN = generatePin()
        console.log(PRIVATE_PIN)
        setStt('waiting')
        sendEmail({name: form.username, email: form.email, pin: PRIVATE_PIN}, setNot)
    }

    return {stt, reSend, dis, setInp, inp}

}
