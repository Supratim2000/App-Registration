import { Dispatch, SetStateAction } from "react"
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native"
import PhoneInput from "react-native-phone-number-input"

export type CheckDateGreaterThanTodayReturnType = {
  isGreater: boolean,
  formattedDate: string
}

export type HeadingProp = {
    isPortrait: boolean,
    headingMessage: string
}

export type InputProps = {
    heading: string,
    inputType?: KeyboardTypeOptions,
    infoType: string
    isMandatory?: boolean,
    isError?: boolean,
    errorSetter?: Dispatch<SetStateAction<boolean>>,
    errorPrompt?: string,
    inputData: string,
    setInputData: Dispatch<SetStateAction<string>>,
    containerStyle?: StyleProp<ViewStyle>
}

export type StateObjectType = {
    label: string,
    value: string
}

export type StateSelectorProps = {
    heading: string,
    listData: StateObjectType[],
    isMandatory?: boolean,
    isError?: boolean,
    errorSetter?: Dispatch<SetStateAction<boolean>>,
    errorPrompt?: string,
    inputState: string | null,
    setInputState: Dispatch<SetStateAction<string | null>>
}

export type DataProps = {
    heading: string,
    content: string
}

export type DateProps = {
    selectedDate: string,
    isError: boolean,
    errorPrompt: string
    datePickerHandler: () => void,
    pickerVisible: boolean,
    confirmHandler: (date: Date) => void,
    cancelHandler: () => void
}

export type ContactProps = {
    heading: string,
    isMandatory?: boolean,
    isError?: boolean,
    errorSetter?: Dispatch<SetStateAction<boolean>>,
    errorPrompt?: string,
    contactRef: React.RefObject<PhoneInput | null>,
    defaultValue: string,
    defaultCode: | "AF"
    | "AL"
    | "DZ"
    | "AS"
    | "AD"
    | "AO"
    | "AI"
    | "AQ"
    | "AG"
    | "AR"
    | "AM"
    | "AW"
    | "AU"
    | "AT"
    | "AZ"
    | "BS"
    | "BH"
    | "BD"
    | "BB"
    | "BY"
    | "BE"
    | "BZ"
    | "BJ"
    | "BM"
    | "BT"
    | "BO"
    | "BA"
    | "BW"
    | "BV"
    | "BR"
    | "IO"
    | "VG"
    | "BN"
    | "BG"
    | "BF"
    | "BI"
    | "KH"
    | "CM"
    | "CA"
    | "CV"
    | "BQ"
    | "KY"
    | "CF"
    | "TD"
    | "CL"
    | "CN"
    | "CX"
    | "CC"
    | "CO"
    | "KM"
    | "CK"
    | "CR"
    | "HR"
    | "CU"
    | "CW"
    | "CY"
    | "CZ"
    | "CD"
    | "DK"
    | "DJ"
    | "DM"
    | "DO"
    | "EC"
    | "EG"
    | "SV"
    | "GQ"
    | "ER"
    | "EE"
    | "SZ"
    | "ET"
    | "FK"
    | "FO"
    | "FJ"
    | "FI"
    | "FR"
    | "GF"
    | "PF"
    | "TF"
    | "GA"
    | "GM"
    | "GE"
    | "DE"
    | "GH"
    | "GI"
    | "GR"
    | "GL"
    | "GD"
    | "GP"
    | "GU"
    | "GT"
    | "GG"
    | "GN"
    | "GW"
    | "GY"
    | "HT"
    | "HM"
    | "HN"
    | "HU"
    | "IS"
    | "IN"
    | "ID"
    | "IR"
    | "IQ"
    | "IE"
    | "IM"
    | "IL"
    | "IT"
    | "CI"
    | "JM"
    | "JP"
    | "JE"
    | "JO"
    | "KZ"
    | "KE"
    | "XK"
    | "KW"
    | "KG"
    | "LA"
    | "LV"
    | "LB"
    | "LS"
    | "LR"
    | "LY"
    | "LI"
    | "LT"
    | "LU"
    | "MO"
    | "MK"
    | "MG"
    | "MW"
    | "MY"
    | "MV"
    | "ML"
    | "MT"
    | "MH"
    | "MQ"
    | "MR"
    | "MU"
    | "YT"
    | "MX"
    | "FM"
    | "MD"
    | "MC"
    | "MN"
    | "ME"
    | "MS"
    | "MA"
    | "MZ"
    | "MM"
    | "NA"
    | "NR"
    | "NP"
    | "NL"
    | "NC"
    | "NZ"
    | "NI"
    | "NE"
    | "NG"
    | "NU"
    | "NF"
    | "KP"
    | "MP"
    | "NO"
    | "OM"
    | "PK"
    | "PW"
    | "PS"
    | "PA"
    | "PG"
    | "PY"
    | "PE"
    | "PH"
    | "PN"
    | "PL"
    | "PT"
    | "PR"
    | "QA"
    | "CG"
    | "RO"
    | "RU"
    | "RW"
    | "RE"
    | "BL"
    | "SH"
    | "KN"
    | "LC"
    | "MF"
    | "PM"
    | "VC"
    | "WS"
    | "SM"
    | "SA"
    | "SN"
    | "RS"
    | "SC"
    | "SL"
    | "SG"
    | "SX"
    | "SK"
    | "SI"
    | "SB"
    | "SO"
    | "ZA"
    | "GS"
    | "KR"
    | "SS"
    | "ES"
    | "LK"
    | "SD"
    | "SR"
    | "SJ"
    | "SE"
    | "CH"
    | "SY"
    | "ST"
    | "TW"
    | "TJ"
    | "TZ"
    | "TH"
    | "TL"
    | "TG"
    | "TK"
    | "TO"
    | "TT"
    | "TN"
    | "TR"
    | "TM"
    | "TC"
    | "TV"
    | "UG"
    | "UA"
    | "AE"
    | "GB"
    | "US"
    | "UM"
    | "VI"
    | "UY"
    | "UZ"
    | "VU"
    | "VA"
    | "VE"
    | "VN"
    | "WF"
    | "EH"
    | "YE"
    | "ZM"
    | "ZW"
    | "KI"
    | "HK"
    | "AX",
    contactCodeValue: string,
    textChangeHandler: Dispatch<SetStateAction<string>>,
    textChangeFormattedHandler: Dispatch<SetStateAction<string>>,
    autoFocus?: boolean,
    containerStyle?: StyleProp<ViewStyle>
}