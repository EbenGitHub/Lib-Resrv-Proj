import emailjs from '@emailjs/browser';

const sendEmail = ({name, email, pin}) => {
    return emailjs.send("service_lcp53nu","template_1gumj1e",{
        to_name: name,
        ver_num: pin,
        to_email: email,
        },
        'Bgn7EOGkCKW87zLNw')
    }

export default sendEmail