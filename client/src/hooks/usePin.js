import { useEffect, useState } from 'react';
import { useSignup } from './useSignup';
import sendEmail from '../utils/sendemail';
import generatePin from '../utils/generatepin';
import checkValid from '../utils/check';
import { useDispatch } from 'react-redux';
import { guidUser } from '../reducers/tourguidReducer';
import { createNotification } from '../reducers/notificationReducer';

let PRIVATE_PIN = null

export const usePin = ({form}) => {
    const dispatch = useDispatch()

    const signup = useSignup()
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
                    dispatch(createNotification({title: "Verification is completed! Please wait white we create everything for you! It will be ready just in a moment!", status: 'success'}))
                    signup({
                        variables: {
                          username: form.username,
                          email: form.email,
                          password: form.password,
                          profession: form.profession
                        }
                      })
                    dispatch(guidUser())
            } else {
                dispatch(createNotification({title: 'invalid PIN! Please input the pin number sent to your email account. If you do not find it, you can press resend.'}))
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
        setStt('waiting')
        sendEmail({name: form.username, email: form.email, pin: PRIVATE_PIN})
        .then(() => {
            dispatch(createNotification({title: `Hi ${form.username}👋.Verification pin was sent to ${form.email}. Please check your email.`, status: 'success'}))
        })
        .catch((e) => {
            dispatch(createNotification({title: `Error happend while sending email message. Are you sure ${form.email} is your email address or are you connected to the internet? ${e.text}`, status: 'danger'}))
        })
    }

    return {stt, reSend, dis, setInp, inp}

}
