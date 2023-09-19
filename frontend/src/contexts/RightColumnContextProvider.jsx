import { useState, createContext, useContext } from "react";

export const RightColumnContext = createContext()

const RightColumnContextProvider = ({ children }) => {

    const [rightColumnType, setRightColumnType] = useState("about");

    return (
        <RightColumnContext.Provider value={{ rightColumnType, setRightColumnType }}>
            {children}
        </RightColumnContext.Provider>
    )
}

export const useRightColumnType = () => {
    return useContext(RightColumnContext)
}

export default RightColumnContextProvider