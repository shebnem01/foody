// 'use client'
// import { Fragment } from 'react'
// import { Listbox, Transition } from '@headlessui/react'
// import downArrow from '../../../src/assets/icons/downArrow.svg'
// import styles from '../ResSelectBox/resselectbox.module.css'
// import Image from 'next/image'

// const people = [
//     {
//         id: 1,
//         name: 'Category Type',
//     },
//     {
//         id: 2,
//         name: 'Hamburger',
//     },
//     {
//         id: 3,
//         name: 'Dönər',
//     },
//     {
//         id: 4,
//         name: 'Salat',
//     },
//     {
//         id: 5,
//         name: 'Kabab',
//     },
//     {
//         id: 6,
//         name: 'İçki',
//     },
//     {
//         id: 7,
//         name: 'Şirniyyat',
//     },

// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//     // const [selected, setSelected] = useState(people[0])

//     return (

//         <>
//             <Listbox value={selected} onChange={setSelected}>
//                 {({ open }) => (
//                     <>
//                         <div className="relative max-md:hidden">
//                             <Listbox.Button className={styles['category-btn']}>
//                                 <span className="flex justify-between items-center">
//                                     <span className="block truncate">{selected.name}</span>
//                                     <button>
//                                         <Image src={downArrow} alt='downArrow' />
//                                     </button>
//                                 </span>
//                                 <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
//                                 </span>
//                             </Listbox.Button>
//                             <Transition
//                                 show={open}
//                                 as={Fragment}
//                                 leave="transition ease-in duration-100"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                             >
//                                 <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" id={styles['listbox-option']}>
//                                     {people.map((person) => (
//                                         <Listbox.Option
//                                             key={person.id}
//                                             className={({ active }) =>
//                                                 classNames(
//                                                     active ? 'bg-pink text-white' : 'text-gray-900',
//                                                     'relative cursor-default select-none py-2 pl-3 pr-9'
//                                                 )
//                                             }
//                                             value={person}
//                                         >
//                                             {({ selected, active }) => (
//                                                 <>
//                                                     <div className="flex items-center">
//                                                         <span
//                                                             className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
//                                                         >
//                                                             {person.name}
//                                                         </span>
//                                                     </div>

//                                                     {selected ? (
//                                                         <span
//                                                             className={classNames(
//                                                                 active ? 'text-white' : 'text-indigo-600',
//                                                                 'absolute inset-y-0 right-0 flex items-center pr-4'
//                                                             )}
//                                                         >
//                                                             {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
//                                                         </span>
//                                                     ) : null}
//                                                 </>
//                                             )}
//                                         </Listbox.Option>
//                                     ))}
//                                 </Listbox.Options>
//                             </Transition>
//                         </div>
//                     </>
//                 )}
//             </Listbox>
//         </>

//     )
// }
