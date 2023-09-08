import React from 'react'
import styles from '../styles/UserName.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast';
import { passwordValidate } from '../helper/validate';

const Reset = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: values => {
      navigate('/password')
    },
  });
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className='text-5xl font-bold'>Reset</h1>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter new password</span>
          </div>
          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                placeholder='password'
                {...formik.getFieldProps('password')}
              />
              <input
                className={styles.textbox}
                placeholder='Repeat Password'
                {...formik.getFieldProps('repeatPassword')}
              />
              <button className={styles.btn}>Reset</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Forgot password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset