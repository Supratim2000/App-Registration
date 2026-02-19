import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../../navigation/types";
import { RegistrationStoreType } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_REGISTRATION_KEY } from "../../utils/ProjectConstants";

const initialState: RegistrationStoreType = {
    firstName: '',
    lastName: '',
    address: '',
    contact: '',
    email: '',
    dob: '',
    state: '',
    gender: '',
    loading: false,
    error: null,
    isInitialized: false,
};

export const saveRegistrationDataIntoAsyncStorage = createAsyncThunk<void, UserDataType>(
    'registration/save',
    async (data, thunkAPI) => {
        await AsyncStorage.setItem(ASYNC_STORAGE_REGISTRATION_KEY, JSON.stringify(data));
    }
);

export const retriveRegistrationDataFromAsyncStorage = createAsyncThunk(
    'registration/fetch',
    async (): Promise<UserDataType | null> => {
        const registrationData = await AsyncStorage.getItem(ASYNC_STORAGE_REGISTRATION_KEY);
        return registrationData? JSON.parse(registrationData) as UserDataType : null;
    }
);

export const clearRegistrationDataFromAsyncStorage = createAsyncThunk(
    'registration/clear',
    async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(ASYNC_STORAGE_REGISTRATION_KEY);
        } catch(error) {
            console.error(error);
        }
    }
);

const RegistrationSlice = createSlice({
    name: 'registrationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveRegistrationDataIntoAsyncStorage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveRegistrationDataIntoAsyncStorage.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                Object.assign(state, action.payload);
            })
            .addCase(saveRegistrationDataIntoAsyncStorage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to save data into Async Storage';
            })
            .addCase(retriveRegistrationDataFromAsyncStorage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(retriveRegistrationDataFromAsyncStorage.fulfilled, (state, action) => {
                state.isInitialized = true;
                state.loading = false;
                if (action.payload) {
                    Object.assign(state, action.payload);
                }
            })
            .addCase(retriveRegistrationDataFromAsyncStorage.rejected, (state, action) => {
                state.isInitialized = true;
                state.loading = false;
                state.error = action.error.message || 'Loading registration data failed from async storage';
            })
            .addCase(clearRegistrationDataFromAsyncStorage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearRegistrationDataFromAsyncStorage.fulfilled, () => initialState)
            .addCase(clearRegistrationDataFromAsyncStorage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to clear registration data from async storage';
            });
    }
});

export default RegistrationSlice.reducer;