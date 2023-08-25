import React, { useEffect, useState } from 'react'
import styles from '../styles/UserName.module.css'
import { redirect, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast';
import convertToBase64 from '../helper/convert';
import AxiosClient from '../api/axiosClient';

const avatar = 'https://picsum.photos/id/633/200/200'
export const loader = async () => {
  if (!localStorage.getItem('token')) return redirect('/')
  return null
};
const Profile = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  useEffect(() => {

    AxiosClient.get("/user").then(res => {
      setUser(res.data)
    })
  }, [])
  const formik = useFormik({
    initialValues: {
      email: user.email || '',
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      mobile: user.mobile || '',
      address: user.address || ''
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      try {
        values = await Object.assign(values, { profile: file || user.profile })
        const res = await AxiosClient.put("/user", values)
        toast.success(res.data.msg, { duration: 2000 })
      } catch (error) {
        toast.error(error.response.error)
      }
    },
  });
  const logout = () => {
    localStorage.removeItem('token')
    navigate("/")
  }
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  const img = file || avatar
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ paddingTop: '2em' }}>
          <div className="title flex flex-col items-center">
            <h1 className='text-5xl font-bold'>Profile</h1>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>You can update your info!</span>
          </div>
          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img className={styles.profile_img} src={img} alt="user" />
              </label>
              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="flex gap-6">
                <input
                  className={styles.textbox}
                  placeholder='Fist Name'
                  {...formik.getFieldProps('firstName')}
                />
                <input
                  className={styles.textbox}
                  placeholder='Last Name'
                  {...formik.getFieldProps('lastName')}
                />
              </div>
              <div className="flex gap-6">
                <input
                  className={styles.textbox}
                  placeholder='Mobile'
                  {...formik.getFieldProps('mobile')}
                />
                <input
                  className={styles.textbox}
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                />
              </div>
              <input
                className={styles.textbox}
                placeholder='Address'
                {...formik.getFieldProps('address')}
              />
              <button className={styles.btn}>Update</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Come back later? <button onClick={logout} className='text-red-500'>Logout</button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile