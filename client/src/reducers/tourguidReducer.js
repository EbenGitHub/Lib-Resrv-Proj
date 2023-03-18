import { createSlice } from '@reduxjs/toolkit'

const initialState = {guid: false, bClicked: false}

const tourguidSlice = createSlice({
    name: 'tourguid',
    initialState,
    reducers: {
        guidUser(state, action){
            return {...state, guid: true}
        },
        unguidUser(state, action){
            return {...state, guid: false}
        },
        userClicked(state, action){
            return {...state, bClicked: true}
        }
    }
})

export const { guidUser, unguidUser, userClicked } = tourguidSlice.actions

export default tourguidSlice.reducer