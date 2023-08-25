import React from 'react'
import styles from '../styles/UserName.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast';
import { userNameValidate } from '../helper/validate';

const UserName = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: userNameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: form => {
      navigate('/password', { state: { username: form.username } })
    },
  });

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className='text-5xl font-bold'>Hello Again</h1>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Explore More by connecting by us</span>
          </div>
          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className='profile flex justify-center py-4'>
              <img className={styles.profile_img} src="https://picsum.photos/id/633/200/200" alt="user" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                placeholder='Username'
                {...formik.getFieldProps('username')}
              />
              <button className={styles.btn}>Let's Go</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserName