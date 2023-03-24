import authenticationReducer from "./authenticationReducer";
import deepFreeze from "deep-freeze";

describe("authenticationReducer", () => {

    const token = 'ksjdfksdjfksdjksjk3534524l25240595m92529m293,9,mcvm2dd,29d29,d'

    test("authentication works with right action", () => {
        
        const action = {
            type: 'authentication/authenticate',
            payload: token
        }

        const newState = authenticationReducer(null, action)
        expect(newState).toBe(token)
    })

    test("authentication can be removed with right action", () => {
        
        const action = {
            type: 'authentication/unauthenticate',
            payload: null
        }
        const state = token

        deepFreeze(state)
        const newState = authenticationReducer(state, action)
        expect(newState).toBe(null)
    })
      
})