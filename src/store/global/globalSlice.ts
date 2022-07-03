// library
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Components

// Store
import type { RootState } from '..'

// Styles


interface IGlobalSlice {
    entity: any
}

const initialState: IGlobalSlice = {
    entity: []
}

const globalSlice = createSlice( {
    name: 'global',
    initialState,
    reducers: {
        addEntity: ( state, action ) => {
            console.log( action.payload )
            console.log( state )
            state.entity = [ ...state.entity, action.payload ]
        }
    }
} )

const { actions, reducer } = globalSlice

export const { addEntity } = actions
export default reducer
