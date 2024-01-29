import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { useTranslation } from 'next-i18next'
import { handleRestID } from '../../../redux/features/restaurantSlice'
import { useDispatch } from 'react-redux';


export default function AddResCategoryBox() {

    const { t } = useTranslation('common')
    const dispatch = useDispatch()
    const [isCurrentCategory, setCurrentCategory] = useState(null)

    const handleChangeCategory = (currentCategory, restaurantID) => {
        setCurrentCategory(currentCategory)
        dispatch(handleRestID(restaurantID))
    }

    const { data } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { data } = await axios.get('/api/category')
            return data
        },
    })

    const handleCategoryList = () => {
        const categoryList = data?.result.data.filter((category, index, arr) => {
            const categoryName = category?.name;
            const currentIndex = arr.findIndex((item) => item?.name === categoryName);
            return currentIndex === index;
        });
        return categoryList
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="w-full flex justify-between items-center h-[40px] rounded-xl bg-[#5A5B70] text-[#F2F2F2] px-4 text-sm font-semibold shadow-sm hover:opacity-90">
                    {isCurrentCategory ? isCurrentCategory : t('Category Name')}
                    <ChevronDownIcon className="w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 top-12 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ maxHeight: '130px', overflowY: 'auto' }}>
                    <style>
                        {`
                            ::-webkit-scrollbar {
                                width: 5px;
                            }

                            ::-webkit-scrollbar-track {
                                background: transparent; 
                            }

                            ::-webkit-scrollbar-thumb {
                                background: #C74FEB; 
                                border-radius:10px;
                            }

                            ::-webkit-scrollbar-thumb:hover {
                                background: #555; 
                            }
                        `}
                    </style>
                    <div className='py-2 flex flex-col w-full'>
                        {handleCategoryList()?.map((category) => (
                            <Menu.Item key={category?.id} className='hover:bg-[#C74FEB] hover:text-white ease-linear duration-200 py-2 px-3' >
                                <a
                                    href="#"
                                    onClick={() => handleChangeCategory(category?.name, category?.id)}
                                    className='bg-gray-100 text-gray-900'>
                                    {category?.name}
                                </a>
                            </Menu.Item>
                        ))}

                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}