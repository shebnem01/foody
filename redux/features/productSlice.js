import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActiveProductCategory: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        handleCategoryData: (state, action) => {
            state.isActiveProductCategory = action.payload
        },
    }
})

export const { handleCategoryData} = productSlice.actions

export default productSlice.reducer