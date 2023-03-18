import { createSlice } from '@reduxjs/toolkit'
import * as uuid from 'uuid'

const initialState = []

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action){
            return state.concat({
                id: uuid.v4(), 
                title: action.payload.title, 
                status: action.payload.status || 'danger', 
                link: action.payload.link
            })
        },
        deleteNotification(state, action){
            return state.filter(n => n.id !== action.payload.id)
        }
    }
})

export const { createNotification, deleteNotification } = notificationSlice.actions

export default notificationSlice.reducer