import { useState, createContext, useContext } from "react";

export const RightColumnTypeContext = createContext()

const RightColumnTypeContextProvider = ({ children }) => {

    const [rightColumnType, setRightColumnType] = useState("about");

    return (
        <RightColumnTypeContext.Provider value={{ rightColumnType, setRightColumnType }}>
            {children}
        </RightColumnTypeContext.Provider>
    )
}

export const useRightColumnType = () => {
    return useContext(RightColumnTypeContext)
}

export default RightColumnTypeContextProvider