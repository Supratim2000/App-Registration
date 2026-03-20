import { useWindowDimensions } from "react-native";
import { DIMENTION_THRESHOLD } from "../utils/ProjectConstants";

export const useDevicetype = (): string => {
    const { width, height } = useWindowDimensions();
    const isMobile = Math.min(width, height) < DIMENTION_THRESHOLD;

    return isMobile ? 'mobile' : 'tablet';
}