'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ClientHeader from "../../components/ClientHeader/ClientHeader";
import { useMutation } from "@tanstack/react-query";
import { PulseLoader } from 'react-spinners';

export default function RegisterPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    AOS.init()
  }, [])

  const { mutate: signupUser } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/auth/signup", {
        email: userEmail,
        password: userPassword,
        fullname: fullName,
        userName: userName,
      }),
    onSuccess: (data) => {
      if (data) {
        setIsLoading(true)
        setTimeout(() => {
          toast.success('Registered With Successfully')
        })
        setTimeout(() => {
          router.push('/login')
        }, 5000)
      } else {
        setTimeout(() => {
          toast.error('Please, Enter Correct Email and Password!')
        })
      }
    },
    onError: () => {
      toast.error('Please, Enter Right Personal Information!')
    },
  });

  const handleName = (e) => {
    setFullName(e.target.value)
  }

  const handleUsername = (e) => {
    setUserName(e.target.value)
  }

  const handleEmail = (e) => {
    setUserEmail(e.target.value)
  }

  const handlePass = (e) => {
    setUserPassword(e.target.value)
  }

  const signupClient = () => {
    signupUser()
  }

  return (
    <>
      <Head>
        <title>Foody | Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="sm:mr-32px sm:ml-32px" style={{ "zoom": "0.66" }}>
        <ClientHeader />
        <div className="flex-col mx-3 my-3 flex lg:flex-row sm:mx-0">
          <div className="bg-clientRed py-3 lg:w-3/6 w-full lg:h-[900px] h-[160px] sm:pt-24 sm:pl-40 sm:mr-10 sm:pb-48 sm:pr-15 px-10 rounded-4 mb-11" data-aos='fade-right'>
            <img
              alt="register"
              src="/loginImages/register.svg"
              className="lg:w-5/6 lg:h-[630px] h-[150px] w-[240px] mx-auto"
            />
          </div>
          <div className="lg:w-2/6 mx-auto w-full"  data-aos='fade-left'>
            <div className="flex lg:ml-20 mx-auto justify-center flex-row sm:gap-x-16 sm:ml-174px sm:mb-18 sm:mt-105px gap-x-9 mb-15">
              <p onClick={() => router.push('/login')} className="cursor-pointer text-clientGray sm:text-3xl text-xl font-normal">
                Login
              </p>
              <p className="text-clientRed sm:text-3xl text-xl font-medium sm:mr-44">
                Register
              </p>
            </div>
            <div className="">
              <div className="mb-26px">
                <p className=" font-body text-lg sm:mb-10px sm:text-xl text-grayInput mb-4 font-medium">
                  Full Name
                </p>
                <input
                  onChange={(e) => handleName(e)}
                  placeholder="Full name"
                  className="pl-3 sm:h-68px bg-clientInput w-full h-14 text-lg font-medium"
                />
              </div>
              <div className="mb-26px">
                <p className=" font-body text-lg sm:mb-10px  text-grayInput sm:text-xl mb-4 font-medium">
                  Username
                </p>
                <input
                  onChange={(e) => handleUsername(e)}
                  placeholder="Username"
                  className="pl-3 sm:h-68px bg-clientInput w-full h-14 text-lg font-medium"
                />
              </div>
              <div className="mb-26px">
                <p className=" font-body text-lg sm:mb-10px  text-grayInput sm:text-xl mb-4 font-medium">
                  Email
                </p>
                <input
                  onChange={(e) => handleEmail(e)}
                  type="email"
                  placeholder="Email"
                  className=" pl-3 sm:h-68px bg-clientInput w-full h-14 text-lg font-medium"
                />
              </div>
              <div className="mb-26px">
                <p className=" font-body sm:mb-10px text-lg text-grayInput sm:text-xl mb-4 font-medium">
                  Password
                </p>
                <input
                  onChange={(e) => handlePass(e)}
                  type="password"
                  placeholder="Password"
                  className="pl-3 sm:mb-72px sm:h-68px bg-clientInput w-full h-14 text-lg font-medium"
                />
              </div>
            </div>

            <button onClick={() => signupClient()} className="w-full text-22 text-white sm:h-68px bg-clientRed font-medium h-14">
              {isLoading ? <div className='flex justify-center items-center mx-0 my-auto'>
                <PulseLoader
                  color="#fff"
                  loading={true}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div> :
                'Register'
              }
            </button>
          </div>
        </div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}