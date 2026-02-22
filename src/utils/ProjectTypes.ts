import { Dispatch, SetStateAction } from "react"
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native"
import PhoneInput from "react-native-phone-number-input"
import { TextStyle } from "react-native"
import { FieldType, GenderValue } from "./ProjectConstants"

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
    disableFutureDates?: boolean,
    isError: boolean,
    errorPrompt: string
    datePickerHandler: () => void,
    pickerVisible: boolean,
    confirmHandler: (date: Date) => void,
    cancelHandler: () => void
}

export type SelectorType = {
    key: string,
    value: GenderValue
}

export type StateType = {
    label: string,
    value: string
}

export type GenderSelectorProp = {
    heading: string,
    selectorData: SelectorType[],
    selected: GenderValue | null,
    setSelected: Dispatch<SetStateAction<GenderValue | null>>,
    isPortrait: boolean,
    errorPrompt: string
}

export type CustomButtonProp = {
    isDisabled?: boolean,
    showLoadingIndicator?: boolean,
    buttonText: string,
    pressHandler: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
    enableStyle?: StyleProp<ViewStyle>,
    disableStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    extraStyle?: StyleProp<ViewStyle>
}

export type ContactProps = {
    heading: string,
    isMandatory?: boolean,
    isError?: boolean,
    errorSetter?: Dispatch<SetStateAction<boolean>>,
    errorPrompt?: string,
    contactRef: React.RefObject<PhoneInput | null>,
    defaultValue: string,
    defaultCode: React.ComponentProps<typeof PhoneInput>["defaultCode"];
    contactCodeValue: string,
    textChangeHandler: Dispatch<SetStateAction<string>>,
    textChangeFormattedHandler: Dispatch<SetStateAction<string>>,
    autoFocus?: boolean,
    containerStyle?: StyleProp<ViewStyle>
}

type BaseFieldProps = {
  heading: string;
  isMandatory?: boolean;
  isError?: boolean;
  errorPrompt?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

type TextFieldProps = BaseFieldProps & {
  type: FieldType.TEXT | FieldType.EMAIL;
  value: string;
  onChange: (val: string) => void;
};

type PhoneFieldProps = BaseFieldProps & {
  type: FieldType.PHONE;
  value: string;
  onChange: (val: string) => void;
};

type DateFieldProps = BaseFieldProps & {
  type: FieldType.DATE;
  value: string;
  onConfirm: (date: Date) => void;
};

type GenderFieldProps = BaseFieldProps & {
  type: FieldType.GENDER;
  selected: GenderValue | null;
  setSelected: (val: GenderValue) => void;
  options: { key: string; value: GenderValue }[];
};

type StateFieldProps = BaseFieldProps & {
  type: FieldType.STATE;
  selected: string | null;
  setSelected: (val: string) => void;
  listData: StateType[];
};

export type FormFieldProps =
  | TextFieldProps
  | PhoneFieldProps
  | DateFieldProps
  | GenderFieldProps
  | StateFieldProps;