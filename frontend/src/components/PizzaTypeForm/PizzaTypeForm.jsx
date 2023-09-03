import { useContext } from "react";
import { Context } from "../../context.js"
import { MainContext } from "../../mainContext.js"

const PizzaTypeForm = () => {

  const { allPizzaTypes, setAllPizzaTypes } = useContext(MainContext);
  const { newOrModifiedPizzaType, setNewOrModifiedPizzaType } = useContext(Context);

  const pizzaTypeUrl = "/api/pizzaTypes"

  const inputChecker = () => {
    return (newOrModifiedPizzaType.pizzaName !== "" && newOrModifiedPizzaType.ingredients !== "" &&
      newOrModifiedPizzaType.price !== "" && newOrModifiedPizzaType.allergens !== "" &&
      newOrModifiedPizzaType.src !== "")
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputChecker() && newOrModifiedPizzaType._id === undefined) {
      const saveOnServer = async () => {
        if (newOrModifiedPizzaType !== undefined && newOrModifiedPizzaType._id === undefined) {
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
            setAllPizzaTypes([...allPizzaTypes, data])
            setNewOrModifiedPizzaType([]);
            console.log("New pizza type was saved!");
          }
        }
      }

      return saveOnServer(newOrModifiedPizzaType)
    }
    else if (inputChecker() && newOrModifiedPizzaType._id !== "") {
      const updateOnServer = async () => {
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
            setAllPizzaTypes([...allPizzaTypes, data])
            setNewOrModifiedPizzaType({ pizzaName: "" });
            console.log("Modified pizza type was updated!")
          }
        }
      }

      return updateOnServer(newOrModifiedPizzaType)
    }
    else { console.log("Wrong data - no modification!") }

  }

  function cancelButton() {
    setNewOrModifiedPizzaType({ pizzaName: "" })
  }

  return (
    <form id="pizza-type-form" onSubmit={handleSubmit}>
      <p style={{ fontSize: "20px", margin: "0" }} >
        {newOrModifiedPizzaType._id === undefined
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
            {newOrModifiedPizzaType._id === undefined
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