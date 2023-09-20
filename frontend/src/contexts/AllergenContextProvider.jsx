import { createContext, useState, useEffect, useContext } from "react"
import { useItemIsActiveStatus } from "./ItemIsActiveStatusContextProvider"
import { useClientContext } from "./ClientContextProvider";

export const AllergenContext = createContext();

const AllergenContextProvider = ({ children }) => {
    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const { actualClientData } = useClientContext();

    const [allAllergens, setAllAllergens] = useState([]);
    const [rejectedAllergens, setRejectedAllergens] = useState([]);
    const [newOrModifiedAllergen, setNewOrModifiedAllergen] = useState("");
    const [updatableAllergenId, setUpdatableAllergenId] = useState("");


    const allergenUrl = "/api/allergens"

    const allergensFetch = async (url) => {
        const actualAllergenUrl = `${allergenUrl}?isActive=${itemIsActiveStatus}`

        try {
            const response = await fetch(actualAllergenUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch message.");
            }
            const data = await response.json();
            if (data) setAllAllergens(data);
            /* empty array lehet, de undifined nem!!! */
        } catch (error) {
            console.error("Error fetching allergens:", error.message);
        }
    };

    useEffect(() => {
        allergensFetch(allergenUrl);
    }, [newOrModifiedAllergen]);

    function allergenStatusHandler(allergenId, checkboxStatus) {
        const modifiedAllergen = allAllergens.find(allergen => allergen._id === allergenId)
        modifiedAllergen.isChecked = checkboxStatus
        const signAllergens = allAllergens.filter(allergen => allergen.isChecked)
        setRejectedAllergens(signAllergens)
    }

    useEffect(() => {
        allergensFetch(allergenUrl);
    }, [allergenUrl]);

    const saveOnServer = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrModifiedAllergen)
        };
        const response = await fetch(allergenUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
            console.log(data)
        }
        else {
            setNewOrModifiedAllergen("");
            console.log("New allergen was saved!")
        }
    }

    const updateOnServer = async () => {
        const updatableAllergenUrl = allergenUrl + "/" + updatableAllergenId;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrModifiedAllergen)
        };
        const response = await fetch(updatableAllergenUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
            console.log(data)
        }
        else {
            setUpdatableAllergenId("");
            setNewOrModifiedAllergen("");
            console.log("Modified allergen was saved!")
        }
    }

    async function deleteAllergen(removableAllergenId) {
        if (actualClientData.bossStatus === true) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch(`${allergenUrl}/${removableAllergenId}`, requestOptions);
                if (response.status === 200) {
                    const newAllergenList = allAllergens.filter(allergen => allergen._id !== removableAllergenId);
                    setAllAllergens(newAllergenList)
                    console.log('Allergen delete was successful');
                } else {
                    throw new Error("Failed to delete message.")
                }
            } catch (error) {
                console.error("Problem with allergen delete!", error.message)

            }
        } else {
            try {
                const removeableAllergenName = allAllergens.find(allergen => allergen._id === removableAllergenId).allergenName;
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ allergenName: removeableAllergenName, isActive: false })
                };
                const response = await fetch(`${allergenUrl}/${removableAllergenId}`, requestOptions);
                if (response.status === 200) {
                    const newAllergenList = allAllergens.filter(allergen => allergen._id !== removableAllergenId);
                    setAllAllergens(newAllergenList)
                    console.log('Allergen remove was successful');
                } else {
                    throw new Error("Failed to remove allergen.")
                }
            } catch (error) {
                console.log("Problem with allergen remove!", error.message)
            }
        }
    };

    return (
        <AllergenContext.Provider value={{
            allAllergens, setAllAllergens,
            rejectedAllergens, setRejectedAllergens,
            newOrModifiedAllergen, setNewOrModifiedAllergen,
            updatableAllergenId, setUpdatableAllergenId,
            allergenStatusHandler,
            deleteAllergen,
            saveOnServer, updateOnServer
        }}>
            {children}
        </AllergenContext.Provider>
    )
}

export const useAllergenContext = () => {
    return useContext(AllergenContext)
}

export default AllergenContextProvider