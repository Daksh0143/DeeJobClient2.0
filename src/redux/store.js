import rootReducer from "./reducer"

const { configureStore } = require("@reduxjs/toolkit")


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})

export default store
