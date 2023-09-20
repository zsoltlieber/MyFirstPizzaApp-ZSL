import { createContext, useState, useEffect, useContext } from "react"
import { useItemIsActiveStatus } from "./ItemIsActiveStatusContextProvider"

export const AllergenContext = createContext();

const AllergenContextProvider = ({ children }) => {

    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const [allAllergens, setAllAllergens] = useState([]);
    const [rejectedAllergens, setRejectedAllergens] = useState([]);
    const [newOrModifiedAllergen, setNewOrModifiedAllergen] = useState("");
    const [updatableAllergenId, setUpdatableAllergenId] = useState("");

    const allergenUrl = "/api/allergens"
    
    const allergensFetch = async (url) => {
        const actualAllergenUrl = `${allergenUrl}?isActive=${itemIsActiveStatus}`
        const response = await fetch(actualAllergenUrl);
        const data = await response.json();
        if (data) setAllAllergens(data);
        /* empty array lehet, de undifined nem!!! */
    };

    useEffect(() => {
        allergensFetch(allergenUrl);
    }, [itemIsActiveStatus]);

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

    function deleteAllergenFetch(actualEndPoint, allergenId) {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        async function deleteAllergen() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newAllergenList = allAllergens.filter(allergen => allergen._id !== allergenId);
                setAllAllergens(newAllergenList)
                console.log('Delete successful');
            } else {
                console.log("Problem with allergen delete!")
            }
        }
        deleteAllergen();
    };

    function removeAllergenFetch(actualEndPoint, allergenId) {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: false })
        };

        async function removeAllergen() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newAllergenList = allAllergens.filter(allergen => allergen._id !== allergenId);
                setAllAllergens(newAllergenList)
                console.log('Remove successful');
            } else {
                console.log("Do not want to modify other's allergens!")
            }
        }
        removeAllergen();
    };


    return (
        <AllergenContext.Provider value={{
            allAllergens, setAllAllergens,
            newOrModifiedAllergen, setNewOrModifiedAllergen,
            rejectedAllergens, setRejectedAllergens,
            allergenStatusHandler,
            deleteAllergenFetch, removeAllergenFetch,
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