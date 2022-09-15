// Import reducers
import appReducer from "./appSlice";
import  authReducer from "./authSlice";
// import accountReducer from "../features/Account/accountSlice"

const { configureStore } = require("@reduxjs/toolkit");

// root reducer
const rootReducer = {
    auth: authReducer,
    app: appReducer,
    // account: accountReducer,
};

// app store
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;