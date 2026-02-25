import { CheckDateGreaterThanTodayReturnType } from "./ProjectTypes";

export const getFormatedDateLocalTimeZone = (date: Date): string => date.toLocaleDateString('en-GB').replace(/\//g, '-');

export const checkEmailValidity = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailRegex.test(email);
};

export const hasSpecialCharacter = (value: string): boolean => {
  const regex = /[@#$%^&*]/;
  return regex.test(value);
}

export const checkDateGreaterThanToday = (date: Date): CheckDateGreaterThanTodayReturnType => {
const formattedDate = getFormatedDateLocalTimeZone(date);
  const today = new Date();
  const startOfToday = new Date(today.toDateString());
  const startOfSelected = new Date(date.toDateString());

  return {
    isGreater: startOfSelected > startOfToday,
    formattedDate,
  };
}

export const isMobilePortrait = (deviceType: string, isPortrait: boolean): boolean => {
    return deviceType === 'mobile' && isPortrait;
}