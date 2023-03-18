import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import authenticationReducer from "./reducers/authenticationReducer";
import tourguidReducer from "./reducers/tourguidReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        authentication: authenticationReducer,
        tourguid: tourguidReducer
    }
})

export default store