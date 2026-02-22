import { SelectorType, StateType } from "./ProjectTypes";

export const WIDTH_THRESHOLD: number = 600;

export const ASYNC_STORAGE_REGISTRATION_KEY = 'registration';

export enum GenderValue {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
};

export enum FieldType {
    TEXT = 'text',
    PHONE = "phone",
    EMAIL = 'email',
    DATE = 'date',
    STATE = 'state',
    GENDER = "gender",
};

export const STATE_DATA: StateType[] = [
    { label: 'Alabama', value: 'Alabama' },
    { label: 'Alaska', value: 'Alaska' },
    { label: 'Arizona', value: 'Arizona' },
    { label: 'California', value: 'California' },
    { label: 'Michigan', value: 'Michigan' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Kerala', value: 'Kerala' },
    { label: 'West Bengal', value: 'West Bengal' },
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
];

export const GENDER_SELECTOR_OPTIONS: SelectorType[] = [
    { key: 'Male', value: GenderValue.MALE},
    { key: 'Female', value: GenderValue.FEMALE},
    { key: 'Other', value: GenderValue.OTHER},
];