import { useContext } from "react";
import { Context } from "./../../context.js"

function PizzaTypeForm() {

  const { allPizzaTypes, setAllPizzaTypes, updatablePizzaTypeId, setUpdatablePizzaTypeId,
    newOrModifiedPizzaType, setNewOrModifiedPizzaType } = useContext(Context);

  const pizzaTypeUrl = "/api/pizzaTypes"

  if(allPizzaTypes!==undefined)console.log(allPizzaTypes);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newOrModifiedPizzaType.pizzaName !== "" && newOrModifiedPizzaType.ingredients !== "" &&
      newOrModifiedPizzaType.price !== "" && newOrModifiedPizzaType.allergens !== "" &&
      newOrModifiedPizzaType.src !== "" && updatablePizzaTypeId === "") {

      const saveOnServer = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrModifiedPizzaType)
        };
        const response = await fetch(pizzaTypeUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
          console.log(data)
        }
        else {
          setNewOrModifiedPizzaType({ pizzaName: "" })
          setUpdatablePizzaTypeId("");
          console.log("New pizza type was saved!");
        }
      }
      saveOnServer()
    }
    else if (newOrModifiedPizzaType.pizzaName !== "" && newOrModifiedPizzaType.ingredients !== "" &&
      newOrModifiedPizzaType.price !== "" && newOrModifiedPizzaType.allergens !== "" &&
      newOrModifiedPizzaType.src !== "" && updatablePizzaTypeId !== "") {

      const updateOnServer = async () => {
        const updatablePizzaTypeUrl = pizzaTypeUrl + "/" + updatablePizzaTypeId;

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
          console.log("Modified pizza type was updated!")
        }
        setUpdatablePizzaTypeId("");
        setNewOrModifiedPizzaType({ pizzaName: "" });
      }
      updateOnServer()
    }
    else console.log("Wrong data - no modification!")
  }

  function cancelButton() {
    setUpdatablePizzaTypeId("");
    setNewOrModifiedPizzaType({ pizzaName: "" })
  }
console.log(allPizzaTypes);
  return (
    <form id="pizza-type-form" onSubmit={handleSubmit}>
      <p style={{ fontSize: "20px", margin: "0" }} >
        {updatablePizzaTypeId === ""
          ?
          "NEW PIZZA TYPE FORM"
          :
          "Update pizza type"}
      </p>
      <div>
        <div>
          <input type="text" id="pizzaName" placeholder="pizzaName" value={newOrModifiedPizzaType.pizzaName || ""} required
            onChange={(e) => { setNewOrModifiedPizzaType({ ...newOrModifiedPizzaType, pizzaName: e.target.value }) }} />
        </div>
        <div>
          <input type="text" id="ingredients" placeholder="ingredients separated comma" value={newOrModifiedPizzaType.ingredients || ""} required
            onChange={(e) => { setNewOrModifiedPizzaType({ ...newOrModifiedPizzaType, ingredients: e.target.value }) }} />
        </div>
        <div>
          <input type="text" id="price" placeholder="price" value={newOrModifiedPizzaType.price || ""} required
            onChange={(e) => { setNewOrModifiedPizzaType({ ...newOrModifiedPizzaType, price: parseInt(e.target.value) }) }} />
        </div>
        <div>
          <input type="text" id="allergens" placeholder="allergens separated comma" value={newOrModifiedPizzaType.allergens || ""} required
            onChange={(e) => { setNewOrModifiedPizzaType({ ...newOrModifiedPizzaType, allergens: [e.target.value] }) }} />
        </div>
        <div>
          <input type="text" id="picture" placeholder="picture src" value={newOrModifiedPizzaType.src || ""} required
            onChange={(e) => { setNewOrModifiedPizzaType({ ...newOrModifiedPizzaType, src: e.target.value }) }} />
        </div>

        <div>
          <button type="submit" id="submit-btn" className="btn"  >
            {updatablePizzaTypeId === ""
              ?
              "Submit"
              :
              "Update"}
          </button>
          <button type="button" id="submit-btn" className="btn" onClick={cancelButton}>Cancel</button>
        </div>
      </div>
    </form>
  )
}

export default PizzaTypeForm