// library
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Application from '../../application/Application'

// Components

// Store
import type { RootState } from '../'

// Styles


interface IMainPageSlice {
    entity: any
}

const initialState: IMainPageSlice = {
    entity: []
}

const mainPageSlice = createSlice( {
    name: 'mainPage',
    initialState,
    reducers: {
        addEntity: ( state, action ) => {
            state.entity = [ ...state.entity, action.payload ]
        }
    }
} )

const { actions, reducer } = mainPageSlice

export const { addEntity } = actions
export default reducer
