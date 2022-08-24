// library
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Components

// Store
import type { RootState } from '../'

// Styles


interface IGlobalSlice {

}

const initialState: IGlobalSlice = {

}

const globalSlice = createSlice( {
    name: 'global',
    initialState,
    reducers: {
        
    }
} )

const { actions, reducer } = globalSlice

export const {  } = actions
export default reducer
