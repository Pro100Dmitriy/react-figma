// library
import { configureStore } from '@reduxjs/toolkit'

// Store
import globalSlice from './global/globalSlice'
import mainPage from './slices/mainPageSlice'


const store = configureStore( {
    reducer: {
        globalSlice,
        mainPage
    },
    devTools: process.env.NODE_ENV !== 'production'
} )

export type RootState = ReturnType<typeof store.getState>

export default store