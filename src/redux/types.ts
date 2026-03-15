import { UserDataType } from "../navigation/types";
import { Store } from "./store";

export type RegistrationStoreType = UserDataType & {
    loading: boolean;
    error: string | null;
};

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;