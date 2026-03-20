import { configureStore } from "@reduxjs/toolkit";
import RegistrationReducer from "./slices/RegistrationSlice";

export const Store = configureStore({
    reducer: {
        registration: RegistrationReducer,
    }
});

