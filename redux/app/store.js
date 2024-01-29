import { configureStore } from '@reduxjs/toolkit'
import editModalReducer from '../features/editModalSlice'
import delModalReducer from '../features/delModalSlice'
import productReducer from '../features/productSlice'
import restaurantReducer from '../features/restaurantSlice'
import langReducer from '../features/langSlice'

export const store = configureStore({
    reducer: {
        modal: editModalReducer,
        delModal: delModalReducer,
        product: productReducer,
        restaurant: restaurantReducer,
        language: langReducer,
    },
})
