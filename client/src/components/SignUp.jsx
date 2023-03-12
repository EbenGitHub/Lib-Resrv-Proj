import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom/dist';

const SignUp = () => {
    const navigate = useNavigate()
    const professions = ['Student', 'Employee', 'Employer', 'Others'];
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          passwordcnf: '',
          profession: professions[0],
        },
        onSubmit: function (values) {
            console.log(values)
        },
        validationSchema: Yup.object({
            username: Yup
                    .string()
                    .label('user name')
                    .required()
                    .min(4, 'username should be atleast 4 characters long'),
            profession: Yup
                        .string()
                        .oneOf(professions, 'The profession you chose does not exist'),
            password: Yup
                  .string()
                  .min(10)
                  .required(),
            passwordcnf: Yup
                  .string()
                  .required()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
          })
      })
    
      return (
        <div className="bg-blue-200 min-w-screen py-40 min-h-screen overflow-x-hidden">
          <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3">
          <h1 className='text-3xl mb-3 text-center'>Register</h1>
            <div className='mb-4'>
              <label for="username">Choose username</label>
              <input type="text" name="username" id="username" 
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
              {formik.touched.username && formik.errors.username && (
                <span className='text-red-500'>{formik.errors.username}</span>
              )}
            </div>

            <div className='mb-4'>
              <label for="profession">Profession</label>
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
              <label for="password">Password</label>
              <input type="password" name="password" id="password"
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
              {formik.touched.password && formik.errors.password && (
                <span className='text-red-500'>{formik.errors.password}</span>
              )}
            </div>

            <div className='mb-4'>
              <label for="passwordcnf">Confirm Password</label>
              <input type="password" name="passwordcnf" id="passwordcnf"
                className={`block w-full rounded border-2 py-1 px-2 ${formik.touched.passwordcnf && formik.errors.passwordcnf ? 'border-red-500' : 'border-gray-300'}`}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordcnf} />
              {formik.touched.passwordcnf && formik.errors.passwordcnf && (
                <span className='text-red-500'>{formik.errors.passwordcnf}</span>
              )}
            </div>

            <div className='text-center'>
              <button className='bg-blue-500 rounded p-3 text-white' type='submit'>Sign Up</button>
            </div>
          </form>
          <p className='text-center pt-5'>already have an account? <span className='text-white font-[700] cursor-pointer' onClick={() => navigate('/login')}>Log in</span></p>
        </div>
      );
}
 
export default SignUp;