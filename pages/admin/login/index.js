import axios from 'axios';
import { useEffect } from 'react';
import NotFound404 from '../../../assets/icons/405.gif'
import logoFoody from '../../../assets/icons/logoFoody.svg'
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const index = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookie, setCookie] = useState(null)
  useEffect(() => {
    setCookie(Cookies.get('accessJWT'))
  }, [Cookies.get('accessJWT')])
  const mailref = useRef()
  const passwordref = useRef()
  const router = useRouter()
  const notifySuccess = () => toast.success("Sign in successfully!", { autoClose: 2000 });
  const notifyError = () => toast.error("Access Denied!");
  const signAdmin = async () => await axios.post('/api/auth/signin', {
    "email": email,
    "password": password
  })
    .then(response => {
      console.log('Post request successful:', response);
      const accessTkn = response.data.user.access_token
      Cookies.set('accessJWT', accessTkn)
      notifySuccess()
      setTimeout(() => {
        router.push('/admin')
      }, 2000)
    })
    .catch(error => {
      console.error('Error making post request:', error);
      notifyError()
    });

  const signIn = () => {
    signAdmin()
  }

  return (

    <div className='bg-bgc h-screen'>
      {!cookie ?
        <>
          <h1 className="ml-9px text-24 pt-11px sm:pt-57px sm:ml-32px font-mukta font-weight800 sm:text-28 text-logocolor"><Image src={logoFoody} alt='foody-logo' /></h1>
          <div className='flex justify-center mt-75px sm:mt-110px'>
            <div className='flex flex-col-reverse sm:flex-row'>
              <div className='sm:bg-loginBgc flex flex-col'>
                <h1 className="sm:mt-58px mt-18px mb-23px font-montserrat text-center text-24 sm:text-35 text-gray1 font-weight700 sm:ml-40px sm:mr-48px sm:mb-40px">Welcome Admin</h1>
                <input ref={mailref} onChange={() => { setEmail(mailref.current.value) }} type='email' placeholder='E-mail' className='sm:pl-40px pl-19px inline mx-auto h-resinput w-207 text-14 sm:text-18 items-center text-gray1 font-weight400 sm:rounded-4 sm:ml-47px sm:mr-58px sm:w-318 bg-inputBg sm:h-input mb-13px sm:mb-26px' />
                <input ref={passwordref} onChange={() => { setPassword(passwordref.current.value) }} type='password' placeholder='Password' className='sm:pl-40px pl-19px inline mx-auto h-resinput w-207 text-14 sm:text-18 items-center text-gray1 font-weight400 sm:rounded-4 sm:ml-47px sm:mr-58px sm:w-318 bg-inputBg sm:h-input mb-23px sm:mb-26px' />
                <button onClick={() => signIn()} type="button" className='text-white rounded-5 sm:rounded-4 sm:mb-58px sm:ml-47px sm:mr-58px font-medium text-14 sm:text-25 hover:bg-pink00 bg-loginBtn py-6px sm:py-10px'>Sign in</button>
              </div>
              <div className='flex sm:w-405 sm:bg-white justify-center'><img src="/loginImages/adminlogin.svg" className='w-174 sm:w-346  sm:mt-55 sm:ml-30 sm:mb-52 sm:mr-30' alt='login img' /></div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" />
        </> : <Image className='h-screen w-screen' src={NotFound404} />}
    </div>

  )
}
export default index;