// library
import { configureStore } from '@reduxjs/toolkit'

// Store
import mainPage from './slices/mainPageSlice'


const store = configureStore( {
    reducer: {
        mainPage
    },
    devTools: process.env.NODE_ENV !== 'production'
} )

export type RootState = ReturnType<typeof store.getState>

export default store