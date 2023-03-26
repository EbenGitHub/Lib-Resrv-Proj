import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useShowHidPass } from '../hooks/useShowHidPass';
import passwordValidation from '../utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';
import { useEffect, useState } from 'react';

const SignUp = ({setForm}) => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.authentication)

    const [show] = useState(true)

    const navigate = useNavigate()
    const [pass, ButtonPass] = useShowHidPass()
    const [passcnf, ButtonPassCnf] = useShowHidPass()

     useEffect(() => {
      if (authentication && show) {
        dispatch(createNotification({title: 'You are already signed in!', status: 'warning'}))
        navigate('/books')
        return
      }
     }, [authentication]) // eslint-disable-line

    const professions = ['Student', 'Employee', 'Employer', 'Others'];
    const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: '',
          passwordcnf: '',
          profession: professions[0],
        },
        onSubmit: function (values) {
          setForm(values)
          navigate('/verify')
        },
        validationSchema: Yup.object({
            username: Yup
                    .string()
                    .label('user name')
                    .required('Username is required')
                    .min(4, 'username should be atleast 4 characters long'),
            email: Yup
                    .string()
                    .email('Email must be a valid email')
                    .required('Email is required'),
            profession: Yup
                        .string()
                        .oneOf(professions, 'The profession you chose does not exist'),
            password: Yup
                    .string()
                    .min(10, 'Password should be atleast ten characters long')
                    .required('Password is required')
                    .test('validator-custom-name', function (value) {
                      const validation = passwordValidation(value);
                      if (!validation.isValid) {
                        return this.createError({
                          path: this.path,
                          message: validation.errorMessage,
                        });
                      }
                      else {
                        return true;
                      }
                    }),
            passwordcnf: Yup
                  .string()
                  .required('Password confirmation is required')
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
          })
      })
    
      return (
        <div className="bg-blue-200 min-w-screen py-40 min-h-screen overflow-x-hidden">
          <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3">
          <h1 className='text-3xl mb-3 text-center'>Register</h1>
           
            <div className='mb-4'>
              <label htmlFor="username">Choose username</label>
              <input type="text" name="username" id="username" placeholder='username'
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
              {formik.touched.username && formik.errors.username && (
                <span className='text-red-500'>{formik.errors.username}</span>
              )}
            </div>
           
            <div className='mb-4'>
              <label htmlFor="email">Input Email address</label>
              <input type="email" name="email" id="email" placeholder='email' 
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              {formik.touched.email && formik.errors.email && (
                <span className='text-red-500'>{formik.errors.email}</span>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor="profession">Profession</label>
              <select name="profession" id="profession"
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.profession && formik.errors.profession ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.profession} >
                  <option disabled key='dis'>Education level</option>
                {professions.map((profession, index) => (
                  <option value={profession} key={index}>{profession}</option>
                ))}
              </select>
              {formik.touched.profession && formik.errors.profession && (
                <span className='text-red-500'>{formik.errors.profession}</span>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor="password">Password</label>
              <div className='flex flex-row'>
                <input type={pass} name="password" id="password" placeholder='password'
                  className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                  <ButtonPass />
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className='text-red-500'>{formik.errors.password}</span>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor="passwordcnf">Confirm Password</label>
              <div className='flex flex-row'>
                <input type={passcnf} name="passwordcnf" id="passwordcnf" placeholder='confirm password'
                  className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.passwordcnf && formik.errors.passwordcnf ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordcnf} />
                  <ButtonPassCnf />
              </div>
              {formik.touched.passwordcnf && formik.errors.passwordcnf && (
                <span className='text-red-500'>{formik.errors.passwordcnf}</span>
              )}
            </div>

            <div className='text-center'>
              <button className='bg-blue-500 rounded p-3 text-white' type='submit'>Sign Up</button>
            </div>
          </form>
          <p className='text-center pt-5'>already have an account? <span className='text-white font-[700]'>
            <Link to='/login'>Log in</Link>
            </span></p>
        </div>
      );
}
 
export default SignUp;