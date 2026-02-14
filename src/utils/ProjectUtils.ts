import { CheckDateGreaterThanTodayReturnType } from "./ProjectTypes";

export const getFormatedDateLocalTimeZone = (date: Date) : string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};

export const checkEmailValidity = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailRegex.test(email);
};

export const checkDateGreaterThanToday = (date: Date): CheckDateGreaterThanTodayReturnType => {
  const formattedDate: string = getFormatedDateLocalTimeZone(date);
          
  const currentDate: Date = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  const selectedDate: Date = date;
  selectedDate.setHours(0, 0, 0, 0);                  

  return {
    isGreater: selectedDate > currentDate,
    formattedDate
  };
}