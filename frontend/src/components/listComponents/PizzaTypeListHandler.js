import { useContext } from 'react';
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

function PizzaTypeListHandler() {

  const { actualClientData, allPizzaTypes, setAllPizzaTypes } = useContext(MainContext);
  const { setUpdatablePizzaTypeId, setNewOrModifiedPizzaType } = useContext(Context);

  const pizzaTypeUrl = "/api/pizzaTypes"

  function deletePizzaTypeFetch(actualEndPoint, pizzaTypeId) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    async function deletePizzaType() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newPizzaTypeList = allPizzaTypes.filter(pizzaType => pizzaType._id !== pizzaTypeId);
        setAllPizzaTypes(newPizzaTypeList)
        console.log('Delete successful');
      } else {
        console.log("Problem with message delete!")
      }
    }
    deletePizzaType();
  };

  function removePizzaTypeFetch(actualEndPoint, pizzaTypeId) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false })
    };
    async function removePizzaType() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newPizzaTypeList = allPizzaTypes.filter(pizzaType => pizzaType._id !== pizzaTypeId);
        setAllPizzaTypes(newPizzaTypeList)
        setUpdatablePizzaTypeId("");
        setNewOrModifiedPizzaType(null);
        console.log('Remove successful');
      } else {
        console.log("Do not want to modify other's messages!")
      }
    }
    removePizzaType();
  };

  const deletePizzaTypeRow = (pizzaTypeId) => {
    const actualEndPoint = pizzaTypeUrl + "/" + pizzaTypeId;

    if (actualClientData.bossStatus === true) {
      deletePizzaTypeFetch(actualEndPoint, pizzaTypeId);
    }
    else {
      removePizzaTypeFetch(actualEndPoint, pizzaTypeId);
    }
  };

  const updateItem = (pizzaTypeId) => {
    setUpdatablePizzaTypeId(pizzaTypeId);
    const actualPizzaType = allPizzaTypes.find(pizzaType => pizzaType._id === pizzaTypeId);
    setNewOrModifiedPizzaType(actualPizzaType)
  };


  return (
    <>
      {allPizzaTypes && allPizzaTypes !== null && allPizzaTypes.length > 0
        ?
        < div id='pizza-type-list' >
          <p style={{ textAlign: "center", fontSize: "20px", margin: "0" }} >PIZZA TYPE LIST</p>

          <table id="pizza-type-list-table">
            <thead>
              <tr>
                <th>Pizza type name</th>
                <th>Ingredients</th>
                <th>Price</th>
                <th>Allergens</th>
                <th>Picture</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {allPizzaTypes.map((pizzaType, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td><p style={{ width: "40%" }}>{pizzaType.pizzaName}</p></td>
                    <td><p style={{ width: "50%" }}>{pizzaType.ingredients}</p></td>
                    <td><p style={{ width: "10%" }}>{pizzaType.price}</p></td>
                    <td><p style={{ width: "20%" }}>{pizzaType.allergens}</p></td>
                    <td><p style={{ width: "10%" }}>Photo</p></td>
                    <td >
                      <button type="button" id="delete-btn" value={pizzaType._id} onClick={(e) => deletePizzaTypeRow(e.target.value)}>DEL </button>
                    </td>
                    <td >
                      <button type='button' id="update-btn" value={pizzaType._id} onClick={(e) => updateItem(e.target.value)}>UPD</button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table >
        </div>
        : <></>}
    </ >
  )
}

export default PizzaTypeListHandler