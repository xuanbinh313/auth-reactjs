import React from 'react'
import styles from '../styles/UserName.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast';
import { passwordValidate } from '../helper/validate';

const Recovery = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    // validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: values => {
      console.log(values)
      navigate('/reset')
    },
  });
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className='text-5xl font-bold'>Recovery</h1>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter OTP to recover password</span>
          </div>
          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className="textbox flex flex-col items-center gap-6">
              <span className='py-4 text-sm text-left text-gray-500'>Enter 6 digit OTP sent to your email address</span>
              <input
                className={styles.textbox}
                placeholder='OTP'
                {...formik.getFieldProps('otp')}
              />
              <button className={styles.btn}>Recover</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Can't get OTP? <button className='text-red-500'>Resend</button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Recovery