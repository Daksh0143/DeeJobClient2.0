import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "./user/user.slice"
import jobsSlice from "./jobs/jobs.slice"

const rootReducer = combineReducers({
    User: userSlice,
    Jobs: jobsSlice
})

export default rootReducer