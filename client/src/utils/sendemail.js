import emailjs from '@emailjs/browser';
import { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, PUBLIC_API_KEY } from './config';

const sendEmail = ({name, email, pin}) => {
    return emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID,{
        to_name: name,
        ver_num: pin,
        to_email: email,
        },
        PUBLIC_API_KEY)
    }

export default sendEmail