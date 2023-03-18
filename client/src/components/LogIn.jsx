import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useShowHidPass } from '../hooks/useShowHidPass';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';
import { useEffect, useState } from 'react';

const LogIn = () => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.authentication)

    const [show, setShow] = useState(true)

    const login = useLogin()
    const navigate = useNavigate()

    useEffect(() => {
      if (authentication && show) {
        dispatch(createNotification({title: 'You are already logged in!', status: 'warning'}))
        navigate('/books')
        return
      }
      
    }, [authentication]) //eslint-disable-line

    const [pass, Button] = useShowHidPass()

    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: function (values) {
            setShow(false)
            login({
              variables: {
                username: values.username,
                password: values.password
              }
            })
        },
        validationSchema: Yup.object({
            username: Yup
                    .string()
                    .label('user name')
                    .required('Username is required'),
            password: Yup
                  .string()
                  .required('Password is required')
          })
      })

      return (
        <div className="bg-blue-200 min-w-screen py-40 min-h-screen overflow-x-hidden">
          <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3">
          <h1 className='text-3xl mb-3 text-center'>Sign in</h1>
            <div className='mb-4'>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" 
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
              {formik.touched.username && formik.errors.username && (
                <span className='text-red-500'>{formik.errors.username}</span>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor="password">Password</label>
              <div className='flex flex-row'>
                <input type={pass} name="password" id="password"
                  className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                  <Button />
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className='text-red-500'>{formik.errors.password}</span>
              )}
            </div>

            <div className='text-center'>
              <button className='bg-blue-500 rounded p-3 text-white' type='submit'>Log In</button>
            </div>
          </form>
          <p className='text-center pt-5'>don't have an account yet? <span className='text-white font-[700]'>
            <Link to='/signup'>Sign up</Link>
            </span></p>
        </div>
      );
}
 
export default LogIn;