import Image from 'next/image'
import editIcon from '../../assets/icons/editIcon.svg'
import trashIcon from '../../assets/icons/trashIcon.svg'
import { openOfferModalEdit } from '../../redux/features/editModalSlice'
import styles from '../AdminCategory/admincategory.module.css'
import { useDispatch } from 'react-redux'
import { openDelOfferModal } from '../../redux/features/delModalSlice'
const OfferItem = ({ offerData }) => {
    const dispatch = useDispatch()
    const offerResult = offerData?.result;
    return offerResult?.data.map((offer, i) => (
        <tr className={styles['table-row']} key={i}>
            <td><span className={styles['table-id']}>{(offer?.id).length > 4 && (offer?.id).slice(0,4)}</span></td>
            <td className='flex justify-center items-center'><Image width={60} height={60} src={offer.img_url} alt='offer' /></td>
            <td>{offer?.name}</td>
            <td>{(offer?.description).length > 60 ? (offer?.description).slice(0, 60) + '...' : offer?.description}</td>
            <td>
                <button onClick={() => dispatch(openOfferModalEdit(offer))} className='mr-4'>
                    <Image src={editIcon} alt='edit-icon' />
                </button>
                <button onClick={() => dispatch(openDelOfferModal(offer?.id))}>
                    <Image src={trashIcon} alt='trash-icon' />
                </button>
            </td>
        </tr>
    ))


}

export default OfferItem