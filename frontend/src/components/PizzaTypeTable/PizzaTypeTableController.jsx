import { useContext, useEffect } from 'react';
import { MainContext } from "../../mainContext.js"
import PizzaTypeTable from './PizzaTypeTable.jsx';

function PizzaTypeTableController() {

  const { actualClientData, allPizzaTypes, setAllPizzaTypes, newOrModifiedPizzaType, setNewOrModifiedPizzaType, itemIsActiveStatus } = useContext(MainContext);

  const pizzaTypeUrl = "/api/pizzaTypes"

  const pizzaTypeFetch = async (url) => {
    const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
    try {
      const response = await fetch(actualUrl);
      const data = await response.json();
      if (data) setAllPizzaTypes(data);
    } catch (error) {
      console.log("Problem with pizza type list!");
    }
  }
  useEffect(() => {
    pizzaTypeFetch(pizzaTypeUrl);
  }, [newOrModifiedPizzaType]);

  async function deletePizzaTypeFetch(pizzaTypeId) {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(`${pizzaTypeUrl}/${pizzaTypeId}`, requestOptions);
      if (response.status === 200) {
        const newPizzaList = allPizzaTypes.filter(pizza => pizza._id !== pizzaTypeId);
        setAllPizzaTypes(newPizzaList)
        console.log('Pizza delete was successful');
      }
    }
    catch (error) {
      console.log("Problem with pizza delete!")
    }
  };

  async function removePizzaTypeFetch(pizzaTypeId) {
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
  };

  const deletePizzaType = (pizzaTypeId) => {
    if (actualClientData.bossStatus === true) {
      deletePizzaTypeFetch(pizzaTypeId);
    }
    else if (actualClientData !== undefined) {
      removePizzaTypeFetch(pizzaTypeId);
    }
  };

  const updatePizzaType = (pizzaTypeId) => {
    const actualPizzaType = allPizzaTypes.find(pizzaType => pizzaType._id === pizzaTypeId);
    setNewOrModifiedPizzaType(actualPizzaType)
  };


  return (
    <PizzaTypeTable deletePizzaType={deletePizzaType} updatePizzaType={updatePizzaType} />
  )
}

export default PizzaTypeTableController