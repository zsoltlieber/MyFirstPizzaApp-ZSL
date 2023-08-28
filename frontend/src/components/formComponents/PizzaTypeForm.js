import { useState, useContext } from "react";
import { Context } from "./../../context.js"

function PizzaTypeForm() {

  const { updatablePizzaTypeId, setUpdatablePizzaTypeId } = useContext(Context);

  const pizzaTypeUrl = "/api/pizzaTypes"
  const [actualPizzaType, setActualPizzaType] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (actualPizzaType.pizzaName !== "" && actualPizzaType.ingredients !== "" &&
      actualPizzaType.price !== "" && actualPizzaType.allergens !== "" &&
      actualPizzaType.src !== "" && updatablePizzaTypeId === "") {

      const saveOnServer = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(actualPizzaType)
        };
        const response = await fetch(pizzaTypeUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
          console.log(data)
        }
        else {
          console.log("New pizza type was saved!")
        }
      }
      saveOnServer()
    }
    else if (actualPizzaType.pizzaName !== "" && actualPizzaType.ingredients !== "" &&
      actualPizzaType.price !== "" && actualPizzaType.allergens !== "" &&
      actualPizzaType.src !== "" && updatablePizzaTypeId !== "") {
      

      const updateOnServer = async () => {
        const updatablePizzaTypeUrl = pizzaTypeUrl + "/" + updatablePizzaTypeId;

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(actualPizzaType)
        };
        const response = await fetch(updatablePizzaTypeUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
          console.log(data)
        }
        else {
          console.log("New pizza type was saved!")
        }
        setUpdatablePizzaTypeId("");
      }
      updateOnServer()
    }
    else console.log("Wrong data - no modification!")
  }

  return (
    <form id="pizzaType-form" onSubmit={handleSubmit}>
      <p style={{ fontSize: "20px", margin: "0" }} >
        {updatablePizzaTypeId === ""
          ?
          "NEW PIZZA TYPE FORM"
          :
          "Update pizza type"}
      </p>
      <div>
        <div>
          <input type="text" id="pizzaName" placeholder="pizzaName" value={actualPizzaType.pizzaName || ""} required
            onChange={(e) => { setActualPizzaType({ ...actualPizzaType, pizzaName: e.target.value }) }} />
        </div>
        <div>
          <input type="text" id="ingredients" placeholder="ingredients separated comma" value={actualPizzaType.ingredients || ""} required
            onChange={(e) => { setActualPizzaType({ ...actualPizzaType, ingredients: e.target.value }) }} />
        </div>
        <div>
          <input type="text" id="price" placeholder="price" value={actualPizzaType.price || ""} required
            onChange={(e) => { setActualPizzaType({ ...actualPizzaType, price: [e.target.value] }) }} />
        </div>
        <div>
          <input type="text" id="allergens" placeholder="allergens separated comma" value={actualPizzaType.allergens || ""} required
            onChange={(e) => { setActualPizzaType({ ...actualPizzaType, allergens: [e.target.value] }) }} />
        </div>
        <div>
          <input type="text" id="picture" placeholder="picture src" value={actualPizzaType.src || ""} required
            onChange={(e) => { setActualPizzaType({ ...actualPizzaType, src: e.target.value }) }} />
        </div>

        <div>
          <button type="submit" id="submit-btn" className="btn" >
            {updatablePizzaTypeId === ""
              ?
              "Submit"
              :
              "Update"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PizzaTypeForm