
const passwordValidation = (psw) => {
    let valid = true
    let regexpltr = /[a-z]{3,}/i
    let regexpdgt = /\d{3,}/i
    let regexpsml = /[@#$%^&*]{1,}/i
    valid = regexpltr.test(psw) && regexpdgt.test(psw) && regexpsml.test(psw);
    return valid ? {
      isValid: true,
    } : {
      isValid: false,
      errorMessage: 'Password should contain atleast three letters, three numbers and one of symbols @ # $ % ^ & *',
    }
  }

export default passwordValidation