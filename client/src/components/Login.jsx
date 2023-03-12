import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../gql/mutations';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = ({setNot, setToken}) => {
  const navigate = useNavigate()
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      console.log('token', token)
      localStorage.setItem('library-user-token', token)
      setNot({title: 'logged in successfully', status: 'success'})
      navigate('/books')
    }
  }, [result.data]) // eslint-disable-line
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: function (values) {
            console.log(values)
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
                    .required(),
            password: Yup
                  .string()
                  .required()
          })
      })
    
      return (
        <div className="bg-blue-200 min-w-screen py-40 min-h-screen overflow-x-hidden">
          <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3">
          <h1 className='text-3xl mb-3 text-center'>Sign in</h1>
            <div className='mb-4'>
              <label for="username">Username</label>
              <input type="text" name="username" id="username" 
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
              {formik.touched.username && formik.errors.username && (
                <span className='text-red-500'>{formik.errors.username}</span>
              )}
            </div>

            <div className='mb-4'>
              <label for="password">Password</label>
              <input type="password" name="password" id="password"
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
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