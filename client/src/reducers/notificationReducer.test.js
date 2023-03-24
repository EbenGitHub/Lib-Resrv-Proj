import notificationReducer from "./notificationReducer";
import deepFreeze from "deep-freeze";
import * as uuid from 'uuid'

describe("notificationReducer", () => {

    const initialState = [{title: "notification one", status: "warning", id: uuid.v4()}]

    test("notification state is not changed with wrong action", () => {
        
        const action = {
            type: 'notification/do_nothing',
            payload: 'do_not_dispaly_this'
        }
        const state = initialState

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toHaveLength(initialState.length)
        expect(newState).toBe(initialState)
    })

    test("notification can be added with right action", () => {
        
        const action = {
            type: 'notification/createNotification',
            payload: {title: 'dispaly_this', status: 'success'}
        }
        const state = initialState

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState[1].title).toBe('dispaly_this')
        expect(newState[1].status).toBe('success')
    })

    test("notification can be removed with right action", () => {
        
        const action = {
            type: 'notification/deleteNotification',
            payload: {id: initialState[0].id}
        }
        const state = initialState

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toHaveLength(0)
    })
      
})