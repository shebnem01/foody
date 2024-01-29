'use client'
import styles from './userprofile.module.css'
import Image from 'next/image'
import React from 'react'
import uploadImg from '../../../assets/images/uploadImg.svg'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { uuidGenerator } from '../../../utils/uuidGenerator'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fileStorage } from "../../../server/configs/firebase";
import { useEffect } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'react-toastify'

const UserProfile = () => {
    const { t } = useTranslation('common')
    const contact = useRef()
    const username = useRef()
    const fname = useRef()
    const address = useRef()
    const queryClient = useQueryClient();

    const contactRef = contact.current
    const userNameRef = username.current
    const fnameRef = fname.current

    const [currentUserInfo, setCurrentUserInfo] = useState({
        email: "",
        contact: "",
        fullname: "",
        username: "",
        img_url: ""
    })
    const [localUserImg, setLocalUserImg] = useState(null)
    const [downloadUserImg, setDownloadUserImg] = useState()

    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axios.get('/api/auth/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            }, {
                onSuccess: (userData) => {
                    alert(userData);
                }
            })
            return data
        },
    })

    // const { data:userBasket } = useQuery({
    //     queryKey: ['basket'],
    //     queryFn: async () => {
    //         const { data } = await axios.get('/api/basket', {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //             }
    //         }, {
    //             onSuccess: (data) => {
    //                 console.log(data);
    //             }
    //         })
    //         return data
    //     },
    // })


    useEffect(() => {
        setCurrentUserInfo({
            email: userData?.user?.email,
            fullname: userData?.user?.fullname,
            username: userData?.user?.username,
            img_url: userData?.user.img_url,
            contact: userData?.user?.phone
        })
    }, [userData, userData?.user?.img_url])

    const { mutate: updateUser } = useMutation({
        mutationFn: async () => await axios.put('/api/auth/user', {
            "email": currentUserInfo?.email,
            "username": currentUserInfo?.username,
            "fullname": currentUserInfo?.fullname,
            "img_url": currentUserInfo?.img_url,
            "phone": currentUserInfo?.contact,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }),
        onSuccess: (data) => {
            toast.success("Updated User Info with Successfully!")
            queryClient.invalidateQueries(["user"]);
        },
        onError: () => {
            toast.error("Please, Fill Empty Area!")
        }
    })

    // const { mutate: updateUser } = useMutation({
    //     mutationFn: async () => await axios.post('/api/basket/add', {
    //         product_id: "KQ1QMiMzdXOUe8s1odtM"
    //     }, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //         }
    //     }),
    //     onSuccess: (data) => {
    //         console.log(data);
    //         alert('success')
    //     },
    //     onError: (error) => {
    //         alert('error', error)
    //     }
    // })

    // const { mutate: updateUser } = useMutation({
    //     mutationFn: async () => await axios.post('/api/order/add', {
    //         "basket_id": "uz478K4zToeZnC513UsA",
    //         "delivery_address": "123 Main St, City",
    //         "payment_method": "1",
    //         "contact": "John Doe"
    //     }, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //         }
    //     }),
    //     onSuccess: () => {
    //         alert('success')
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //         alert('error', error)
    //     }
    // })


    const handleSaveUserInfo = (e) => {
        e.preventDefault()
        updateUser()
    }

    const handleNewProductImg = (e) => {
        const selectedFile = e.target.files[0];
        setLocalUserImg(URL.createObjectURL(selectedFile));
        const newUUID = uuidGenerator();
        const imageRef = ref(fileStorage, `images/${selectedFile.name + newUUID}`);
        uploadBytes(imageRef, selectedFile)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        setCurrentUserInfo(prevState => ({ ...prevState, img_url: downloadURL }))
                        console.log("Dosyanın Firebase Storage URL'si: ", downloadURL);
                    })
                    .catch((error) => {
                        console.error("Download URL alınırken bir hata oluştu: ", error);
                    });
            })
            .catch((error) => {
                console.error("Dosya yüklenirken bir hata oluştu: ", error);
            });
    };

    const handleChangeEmail = (e) => {
        setCurrentUserInfo(prevState => ({ ...prevState, email: e.target.value }))
    }

    const handleChangeContact = (e) => {
        setCurrentUserInfo(prevState => ({ ...prevState, contact: e.target.value }))
    }

    const handleChangeUsername = (e) => {
        setCurrentUserInfo(prevState => ({ ...prevState, username: e.target.value }))
    }

    const handleChangeFname = (e) => {
        setCurrentUserInfo(prevState => ({ ...prevState, fullname: e.target.value }))
    }
    console.log(currentUserInfo);
    return (
        <>
            <div className={styles['profile-bg']}>
                <h2 className={styles['profile-head']}>{t('Profile')}</h2>
                <div>
                    <form>
                        <div className={styles['upload-img']}>
                            <button className="flex flex-col items-center relative mb-8 hover:opacity-80">
                                {isLoading ? <Skeleton
                                    circle
                                    width={200}
                                    style={{ "margin-right": "20px" }}
                                    height={200}
                                    containerClassName="avatar-skeleton"
                                /> :

                                    localUserImg ? <Image src={localUserImg} alt="upload" width={150} height={150} className={styles['rounded']} /> :
                                        currentUserInfo?.img_url ? <Image src={currentUserInfo?.img_url} alt="upload" width={150} height={150} className={styles['rounded']} />
                                            :
                                            <Image src={uploadImg} alt="upload" width={150} height={150} className={styles['rounded']}/>
                                }
                                <input
                                    onChange={(e) => handleNewProductImg(e)}
                                    className="absolute -top-4 w-[200px] h-[200px]"
                                    type="file"
                                    style={{ opacity: 0, cursor: "pointer" }}
                                />
                            </button>
                        </div>
                        <div className='flex md:flex-row flex-col w-full justify-between'>
                            <div className='md:w-1/2 w-full mr-14'>
                                <div className='flex flex-col'>
                                    <label className={styles['label']} htmlFor="contact">{t('Contact')}</label>
                                    <input className={styles['profile-inp']} onChange={(e) => handleChangeContact(e)} value={currentUserInfo?.contact} placeholder='Enter number' type="text" id='contact' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className={styles['label']} htmlFor="username">{t('Username')}</label>
                                    <input className={styles['profile-inp']} onChange={(e) => handleChangeUsername(e)} value={currentUserInfo?.username} placeholder='Enter username' type="text" id='username' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className={styles['label']} htmlFor="fullname">{t('Full Name')}</label>
                                    <input className={styles['profile-inp']} onChange={(e) => handleChangeFname(e)} value={currentUserInfo?.fullname} placeholder='Enter Full Name' type="text" id='fullname' />
                                </div>
                            </div>

                            <div className='md:w-1/2 w-full'>
                                <div className='flex flex-col'>
                                    <label className={styles['label']} htmlFor="contact">{t('Email')}</label>
                                    <input className={styles['profile-inp']} onChange={(e) => handleChangeEmail(e)} value={currentUserInfo?.email} placeholder='Enter Email' type="email" />
                                </div>
                                <div className='flex flex-col'>
                                    <label className={styles['label']} htmlFor="contact">{t('Address')}</label>
                                    <input className={styles['profile-inp']} ref={address} placeholder='Enter Address' type="text" />
                                </div>
                                <button onClick={(e) => handleSaveUserInfo(e)} className={styles['save-btn']}>{t('Save')}</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default UserProfile

