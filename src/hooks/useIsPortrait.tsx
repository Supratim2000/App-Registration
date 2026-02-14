import { useWindowDimensions } from "react-native";

const useIsPortrait = () => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    return {width, height, isPortrait};
}

export default useIsPortrait;