import React, { useState } from 'react'
import styles from '../styles/UserName.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast';
import { passwordValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';

const avatar = 'https://picsum.photos/id/633/200/200'

const Register = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const formik = useFormik({
    initialValues: {
      email: '',
      userName: '',
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file })
      console.log(values)
      navigate('/password')
    },
  });
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  const img = file || avatar
  console.log(img)
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '45%', paddingTop: '2em' }}>
          <div className="title flex flex-col items-center">
            <h1 className='text-5xl font-bold'>Register</h1>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Happy to join!</span>
          </div>
          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img className={styles.profile_img} src={img} alt="user" />
              </label>
              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                placeholder='Email'
                {...formik.getFieldProps('email')}
              />
              <input
                className={styles.textbox}
                placeholder='Username'
                {...formik.getFieldProps('userName')}
              />
              <input
                className={styles.textbox}
                placeholder='Password'
                {...formik.getFieldProps('password')}
              />
              <button className={styles.btn}>Register</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Already register? <Link className='text-red-500' to="/">Login Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register