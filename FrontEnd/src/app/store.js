// Import reducers
import appReducer from "./appSlice";
import  authReducer from "./authSlice";
import dashboardReducer from "../features/Dashboard/dashboardSlice.js";
import accountReducer from "../features/Account/AccountSlice";
import imageReducer from "../features/IgameDetailScreen/ImageSlice"

const { configureStore } = require("@reduxjs/toolkit");

// root reducer
const rootReducer = {
    auth: authReducer,
    app: appReducer,
    image: dashboardReducer,
    account: accountReducer,
    imageDetail: imageReducer,
};

// app store
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;