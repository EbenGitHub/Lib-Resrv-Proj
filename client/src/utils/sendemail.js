import emailjs from '@emailjs/browser';

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

export default sendEmail