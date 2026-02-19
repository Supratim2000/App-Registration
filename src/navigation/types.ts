export type UserDataType = {
    firstName: string,
    lastName?: string,
    address: string,
    contact: string,
    email: string,
    dob: string,
    state: string,
    gender: string
}

export type RootStackParamList = {
    AppSplash: undefined,
    Registration: undefined,
    BasicInfo: UserDataType,
    BottomTab: undefined
}
export type AppBottomTabParamList = {
    Home: undefined,
    Basket: undefined,
    Profile: undefined
}