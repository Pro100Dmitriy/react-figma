// library
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Components

// Store
import type { RootState } from '../'

// Styles


interface IGlobalSlice {
    app: object
    entity: any
}

const initialState: IGlobalSlice = {
    app: {},
    entity: []
}

const globalSlice = createSlice( {
    name: 'global',
    initialState,
    reducers: {
        createApp: ( state, action ) => {
            state.app = action.payload
        },
        addEntity: ( state, action ) => {
            state.entity = [ ...state.entity, action.payload ]
        }
    }
} )

const { actions, reducer } = globalSlice

export const { createApp, addEntity } = actions
export default reducer
