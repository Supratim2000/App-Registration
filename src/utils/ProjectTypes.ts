import { Dispatch, SetStateAction } from "react"
import { KeyboardTypeOptions, ListRenderItem, StyleProp, ViewStyle } from "react-native"
import PhoneInput from "react-native-phone-number-input"
import { TextStyle } from "react-native"
import { FieldType, RadioValue } from "./ProjectConstants"

export type CheckDateGreaterThanTodayReturnType = {
  isGreater: boolean;
  formattedDate: string
}

export type HeadingProp = {
    isPortrait: boolean;
    headingMessage: string
}

export type StateObjectType = {
    label: string;
    value: string
}

export type DataProps = {
    heading: string;
    content: string
}

export type SelectorType = {
    key: string;
    value: RadioValue
}

export type SelectionType = {
    label: string;
    value: string
}

export type CampaignCardProps = {
  id: string,
  image?: string,
  heading?: string,
  description?: string
}

export type CarouselSliderProps<T> = {
  heading?: string,
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  onItemPress?: (item: T, index: number) => void;
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

type BaseFieldProps = {
  heading: string;
  isMandatory?: boolean;
  isError?: boolean;
  errorPrompt?: string;
  errorSetter?: Dispatch<SetStateAction<boolean>>;
  containerContentStyle?: StyleProp<ViewStyle>;
  internalStyle?: StyleProp<ViewStyle | TextStyle>;
};

type TextFieldProps = BaseFieldProps & {
  fieldType: FieldType.TEXT | FieldType.EMAIL;
  inputData: string;
  setInputData: Dispatch<SetStateAction<string>>,
  specialCharacterCheck?: boolean
};

type PhoneFieldProps = BaseFieldProps & {
  fieldType: FieldType.PHONE;
  elementRef: React.RefObject<PhoneInput | null>;
  contactValue: string;
  fullyQualifiedContactValue: string,
  onChangeContactValue: Dispatch<SetStateAction<string>>;
  onChangeFullyQualifiedContactValue: Dispatch<SetStateAction<string>>;
  defaultCode?: React.ComponentProps<typeof PhoneInput>["defaultCode"];
  placeholder?: string,
  placeholderTextColor?: string,
  selectionColor?: string
};

type DateFieldProps = BaseFieldProps & {
  fieldType: FieldType.DATE;
  dateValue: string,
  disableFurtherDates?: boolean,
  pickerModalVisible: boolean,
  datePickerButtonHandler: () => void,
  onConfirmSelection: (date: Date) => void,
  onCancelSelection: () => void,
  buttonStyle?: StyleProp<ViewStyle>,
  viewerStyle?: StyleProp<ViewStyle>
  buttonText?: string, 
};

type RadioFieldProps = BaseFieldProps & {
  fieldType: FieldType.RADIO;
  selectorData: SelectorType[];
  radioValue: RadioValue | null;
  setRadioValue: Dispatch<SetStateAction<RadioValue | null>>;
  isSelectorHorizontal?: boolean,
  radioSelectorContainerStyle?: StyleProp<ViewStyle>,
  fieldSelectorStyle?: StyleProp<ViewStyle>,
  radioBorderColor?: string,
  selectionColor?: string
};

type SelectionFieldProps = BaseFieldProps & {
  fieldType: FieldType.SELECTION;
  listData: StateObjectType[];
  inputSelection: string | null;
  searchEnabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  setInputSelection: Dispatch<SetStateAction<string | null>>;
};

export type FormFieldProps =
  | TextFieldProps
  | PhoneFieldProps
  | DateFieldProps
  | RadioFieldProps
  | SelectionFieldProps;