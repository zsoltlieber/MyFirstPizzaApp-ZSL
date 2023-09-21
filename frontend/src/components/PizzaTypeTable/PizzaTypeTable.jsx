import { usePizzaTypeContext } from '../../contexts/PizzaTypeContextProvider.jsx';

const PizzaTypeTable = () => {

  const { allPizzaTypes, updatePizzaType, deletePizzaType } = usePizzaTypeContext();

  return (
    <>
      {allPizzaTypes
        ?
        < div id='pizza-type-list' >
          <p style={{ textAlign: "center", fontSize: "20px", marginTop: "0" }} >PIZZA TYPE LIST</p>

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
                      <button type="text" id="delete-btn" value={pizzaType._id} onClick={(e) => deletePizzaType(e.target.value)}>DEL </button>
                    </td>
                    <td >
                      <button type='button' id="update-btn" value={pizzaType._id} onClick={(e) => updatePizzaType(e.target.value)}>UPD</button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table >
        </div>
        : null
      }
    </ >
  )
}

export default PizzaTypeTable