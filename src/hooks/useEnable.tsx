import { useMemo } from "react"

const useEnable = (conditions: boolean[]): boolean => {
    return useMemo(() => {
        return conditions.some((rule) => rule === true);
    }, [conditions]);
}

export default useEnable;