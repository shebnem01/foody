import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActiveRestID: '',
    isActiveRestCategory: '',
    isActiveRestData: ''
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        handleRestID: (state, action) => {
            state.isActiveRestID = action.payload
        },
        handleRestCategory: (state, action) => {
            state.isActiveRestCategory = action.payload
        },
        handleResCategoryData: (state, action) => {
            state.isActiveRestData = action.payload
        }
    }
})

export const { handleRestID, handleRestCategory, handleResCategoryData } = restaurantSlice.actions

export default restaurantSlice.reducer