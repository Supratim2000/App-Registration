import { Dispatch, SetStateAction } from "react"
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native"
import PhoneInput from "react-native-phone-number-input"
import { TextStyle } from "react-native"
import { FieldType, GenderValue } from "./ProjectConstants"

export type CheckDateGreaterThanTodayReturnType = {
  isGreater: boolean;
  formattedDate: string
}

export type HeadingProp = {
    isPortrait: boolean;
    headingMessage: string
}

export type InputProps = {
    heading: string;
    inputType?: KeyboardTypeOptions;
    infoType: string
    isMandatory?: boolean;
    isError?: boolean;
    errorSetter?: Dispatch<SetStateAction<boolean>>;
    errorPrompt?: string;
    inputData: string;
    setInputData: Dispatch<SetStateAction<string>>;
    containerStyle?: StyleProp<ViewStyle>
}

export type StateObjectType = {
    label: string;
    value: string
}

export type StateSelectorProps = {
    heading: string;
    listData: StateObjectType[];
    isMandatory?: boolean;
    isError?: boolean;
    errorSetter?: Dispatch<SetStateAction<boolean>>;
    errorPrompt?: string;
    inputState: string | null;
    setInputState: Dispatch<SetStateAction<string | null>>
}

export type DataProps = {
    heading: string;
    content: string
}

export type DateProps = {
    selectedDate: string;
    disableFutureDates?: boolean;
    isError: boolean;
    errorPrompt: string
    datePickerHandler: () => void;
    pickerVisible: boolean;
    confirmHandler: (date: Date) => void;
    cancelHandler: () => void
}

export type SelectorType = {
    key: string;
    value: GenderValue
}

export type StateType = {
    label: string;
    value: string
}

export type GenderSelectorProp = {
    heading: string;
    selectorData: SelectorType[];
    selected: GenderValue | null;
    setSelected: Dispatch<SetStateAction<GenderValue | null>>;
    isPortrait: boolean;
    errorPrompt: string
}

export type CustomButtonProp = {
    isDisabled?: boolean;
    showLoadingIndicator?: boolean;
    buttonText: string;
    pressHandler: () => void;
    buttonStyle?: StyleProp<ViewStyle>;
    enableStyle?: StyleProp<ViewStyle>;
    disableStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    extraStyle?: StyleProp<ViewStyle>
}

export type ContactProps = {
  heading: string;
  isMandatory?: boolean;
  isError?: boolean;
  errorSetter?: Dispatch<SetStateAction<boolean>>;
  errorPrompt?: string;
  contactRef: React.RefObject<PhoneInput | null>;
  defaultValue: string;
  defaultCode: React.ComponentProps<typeof PhoneInput>["defaultCode"];
  contactCodeValue: string;
  textChangeHandler: Dispatch<SetStateAction<string>>;
  textChangeFormattedHandler: Dispatch<SetStateAction<string>>;
  autoFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>
}

type BaseFieldProps = {
  heading: string;
  isMandatory?: boolean;
  isError?: boolean;
  errorPrompt?: string;
  errorSetter?: Dispatch<SetStateAction<boolean>>;
  containerContentStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle | TextStyle>;
};

type TextFieldProps = BaseFieldProps & {
  fieldType: FieldType.TEXT | FieldType.EMAIL;
  inputData: string;
  setInputData: Dispatch<SetStateAction<string>>
};

type PhoneFieldProps = BaseFieldProps & {
  fieldType: FieldType.PHONE;
  elementRef: React.RefObject<PhoneInput | null>;
  contactValue: string;
  fullyQualifiedContactValue: string,
  onChangeContactValue: Dispatch<SetStateAction<string>>;
  onChangeFullyQualifiedContactValue: Dispatch<SetStateAction<string>>;
  defaultCode?: React.ComponentProps<typeof PhoneInput>["defaultCode"];
};

type DateFieldProps = BaseFieldProps & {
  fieldType: FieldType.DATE;
  dateValue: string,
  disableFurtherDates?: boolean,
  pickerModalVisible: boolean,
  datePickerButtonHandler: () => void,
  onConfirmSelection: (date: Date) => void,
  onCancenSelection: () => void,
};

type GenderFieldProps = BaseFieldProps & {
  fieldType: FieldType.GENDER;
  selectorData: SelectorType[];
  genderValue: GenderValue | null;
  setGenderValue: Dispatch<SetStateAction<GenderValue | null>>;
  isSelectorHorizontal?: boolean
};

type StateFieldProps = BaseFieldProps & {
  fieldType: FieldType.STATE;
  listData: StateObjectType[];
  inputState: string | null;
  setInputState: Dispatch<SetStateAction<string | null>>
};

export type FormFieldProps =
  | TextFieldProps
  | PhoneFieldProps
  | DateFieldProps
  | GenderFieldProps
  | StateFieldProps;