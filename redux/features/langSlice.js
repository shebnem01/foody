import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActiveLang: 'en',
}

export const langSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        handleLangData: (state, action) => {
            state.isActiveLang = action.payload
        },
    }
})

export const { handleLangData } = langSlice.actions

export default langSlice.reducer