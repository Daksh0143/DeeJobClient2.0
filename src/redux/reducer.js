import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "./user/user.slice"
import jobsSlice from "./jobs/jobs.slice"
import companySlice from "./company/company.slice"

const rootReducer = combineReducers({
    User: userSlice,
    Jobs: jobsSlice,
    Company: companySlice
})

export default rootReducer