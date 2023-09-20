import { useState, useEffect, useContext, createContext } from 'react';
import { useItemIsActiveStatus } from "./ItemIsActiveStatusContextProvider"
import { useClientContext } from "./ClientContextProvider";
import { AllergenContext } from './AllergenContextProvider';

export const PizzaTypeContext = createContext();

const PizzaTypeContextProvider = ({ children }) => {
    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const { actualClientData } = useClientContext();
    const { rejectedAllergens } = useContext(AllergenContext);
    const [allPizzaTypes, setAllPizzaTypes] = useState([]);
    const [newOrModifiedPizzaType, setNewOrModifiedPizzaType] = useState([]);
    const [pizzaIdToOrder, setPizzaIdToOrder] = useState('');
    const [actualPizzas, setActualPizzas] = useState({});

    const pizzaTypeUrl = "/api/pizzaTypes"

    const pizzaTypeFetch = async (url) => {
        const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
        let newPizzaList = [];
        let wrongPizza = 0;
        const response = await fetch(actualUrl);
        const data = await response.json();
        if (response.status === 200 && data.length > 0) {
            setAllPizzaTypes(data)
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < rejectedAllergens.length; j++) {
                    if (data[i].allergens.includes(rejectedAllergens[j].allergenName)) {
                        wrongPizza++;
                    }
                }
                if (wrongPizza < 1) {
                    newPizzaList.push(data[i])
                }
                wrongPizza = 0;
            }
        }
        setActualPizzas(newPizzaList)
    };

    useEffect(() => {
        pizzaTypeFetch(pizzaTypeUrl)
    }, [newOrModifiedPizzaType]);

    const updatePizzaType = async (pizzaTypeId) => {
        const actualPizzaType = allPizzaTypes.find(pizzaType => pizzaType._id === pizzaTypeId);
        setNewOrModifiedPizzaType(actualPizzaType)

        if (newOrModifiedPizzaType !== undefined && newOrModifiedPizzaType._id !== undefined) {
            const updatablePizzaTypeUrl = `${pizzaTypeUrl}/${newOrModifiedPizzaType._id}`;

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrModifiedPizzaType)
            };
            const response = await fetch(updatablePizzaTypeUrl, requestOptions);
            const data = await response.json();
            if (response.status !== 200) {
                console.log(data)
            }
            else {
                setNewOrModifiedPizzaType({ pizzaName: "" });
                console.log("Modified pizza type was updated!")
            }
        }
    }

    async function deletePizzaType(pizzaTypeId) {
        if (actualClientData.bossStatus === true) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                };
                const response = await fetch(`${pizzaTypeUrl}/${pizzaTypeId}`, requestOptions);
                if (response.status === 200) {
                    const newPizzaList = allPizzaTypes.filter(pizza => pizza._id !== pizzaTypeId);
                    setAllPizzaTypes(newPizzaList);
                    console.log('Pizza delete was successful');
                }
            }
            catch (error) {
                console.log("Problem with pizza delete!")
            }

        } else {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isActive: false })
                };
                const response = await fetch(`${pizzaTypeUrl}/${pizzaTypeId}?isActive=${itemIsActiveStatus}`, requestOptions);
                if (response.status === 200) {
                    const newPizzaList = allPizzaTypes.filter(pizza => pizza._id !== pizzaTypeId);
                    setAllPizzaTypes(newPizzaList)
                    console.log('Pizza remove was successful');
                }
            } catch (error) {
                console.log("Problem with pizza remove!")
            }
        }
    };

    return (
        <PizzaTypeContext.Provider value={{
            allPizzaTypes, setAllPizzaTypes,
            actualPizzas, setActualPizzas,
            newOrModifiedPizzaType, setNewOrModifiedPizzaType,
            pizzaIdToOrder, setPizzaIdToOrder,
            updatePizzaType, deletePizzaType
        }}>
            {children}
        </PizzaTypeContext.Provider>
    )

}

export const usePizzaTypeContext = () => {
    return useContext(PizzaTypeContext)
}

export default PizzaTypeContextProvider
