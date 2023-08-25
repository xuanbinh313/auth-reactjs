import React from 'react'
import styles from '../styles/UserName.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast';
import { passwordValidate } from '../helper/validate';
import AxiosClient from '../api/axiosClient';

const Password = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ password }) => {
      const data = { ...location.state, password }
      AxiosClient.post("/login", data)
        .then(res => {
          const { token } = res.data
          localStorage.setItem('token', token)
          navigate("/profile")
        })
        .catch(e => toast.error(e.response.error))
      // navigate('/password')
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
                placeholder='password'
                {...formik.getFieldProps('password')}
              />
              <button className={styles.btn}>Sign In</button>
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

export default Password