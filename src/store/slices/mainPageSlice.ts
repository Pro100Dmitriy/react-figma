// library
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Components

// Store
import type { RootState } from '../'

// Styles


interface IMainPageSlice {

}

const initialState: IMainPageSlice = {

}

const mainPageSlice = createSlice( {
    name: 'mainPage',
    initialState,
    reducers: {

    }
} )

const { actions, reducer } = mainPageSlice

export const {  } = actions
export default reducer
