import { useState, createContext, useContext } from "react";


export const ItemIsActiveStatusContext = createContext();

const ItemIsActiveStatusContextProvider = ({ children }) => {

    const [itemIsActiveStatus, setItemIsActiveStatus] = useState(true);

    return (
        <ItemIsActiveStatusContext.Provider value={{ itemIsActiveStatus, setItemIsActiveStatus }}>
            {children}
        </ItemIsActiveStatusContext.Provider>
    )

}

export const useItemIsActiveStatus = () => {
    return useContext(ItemIsActiveStatusContext)
}

export default ItemIsActiveStatusContextProvider