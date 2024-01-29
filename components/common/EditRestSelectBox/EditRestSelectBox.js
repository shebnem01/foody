import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { handleCategoryData } from '../../../redux/features/productSlice'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { handleRestCategory } from '../../../redux/features/restaurantSlice'


export default function EditRestSelectBox() {

    const dispatch = useDispatch()

    const selAllCategoryData = useSelector((state) => state.product.allCategoryData)

    const [isCurrentCategory, setCurrentCategory] = useState()

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

    const handleChangeCategory = (currentCategoryID, currentRestCategory) => {
        console.log(currentRestCategory);
        setCurrentCategory(currentRestCategory.name)
        dispatch(handleRestCategory(currentCategoryID))
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex justify-between w-full gap-x-1.5 rounded-xl bg-[#5A5B70] text-[#F2F2F2] px-4 py-2 text-sm font-semibold shadow-sm hover:opacity-90">
                    {isCurrentCategory ? isCurrentCategory : 'Category type'}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ maxHeight: '250px', overflowY: 'auto' }}>
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
                    <div className='py-1 flex flex-col w-full'>
                        {handleCategoryList()?.map((category) => (
                            <Menu.Item key={category?.id} className='hover:bg-[#C74FEB] hover:text-white ease-linear duration-200 py-2 px-3' >
                                <a
                                    href="#"
                                    onClick={() => handleChangeCategory(category?.id, category)}
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