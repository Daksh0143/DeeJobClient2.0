import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "./user/user.slice"

const rootReducer = combineReducers({
    User:userSlice
})

export default rootReducer