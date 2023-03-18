import { createSlice } from '@reduxjs/toolkit'
import * as uuid from 'uuid'

const initialState = null

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        authenticate(state, action){
            return action.payload
        },
        unauthenticate(state, action){
            return null
        }
    }
})

export const { authenticate, unauthenticate } = authenticationSlice.actions

export default authenticationSlice.reducer