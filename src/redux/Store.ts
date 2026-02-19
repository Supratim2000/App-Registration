import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from "./slices/RegistrationSlice";

export const Store = configureStore({
    reducer: {
        registration: RegistrationSlice,
    }
});

