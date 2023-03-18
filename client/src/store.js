import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import authenticationReducer from "./reducers/authenticationReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        authentication: authenticationReducer
    }
})

export default store