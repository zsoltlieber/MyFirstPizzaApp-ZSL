import { useState, useContext } from "react";
import { Context } from "./../../context.js"

function AllergenForm() {

  const { updatableAllergenId, setUpdatableAllergenId } = useContext(Context);

  const allergensUrl = "/api/allergens"
  const [actualAllergen, setActualAllergen] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (actualAllergen.pizzaName !== "" && actualAllergen.ingredients !== "" &&
      actualAllergen.price !== "" && actualAllergen.allergens !== "" &&
      actualAllergen.src !== "" && updatableAllergenId === "") {

      const saveOnServer = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(actualAllergen)
        };
        const response = await fetch(allergensUrl, requestOptions);
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
    else if (actualAllergen.pizzaName !== "" && actualAllergen.ingredients !== "" &&
      actualAllergen.price !== "" && actualAllergen.allergens !== "" &&
      actualAllergen.src !== "" && updatableAllergenId !== "") {


      const updateOnServer = async () => {
        const updatableAllergenUrl = allergensUrl + "/" + updatableAllergenId;

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(actualAllergen)
        };
        const response = await fetch(updatableAllergenUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
          console.log(data)
        }
        else {
          console.log("New pizza type was saved!")
        }
        setUpdatableAllergenId("");
      }
      updateOnServer()
    }
    else console.log("Wrong data - no modification!")
  }

  return (
    <form id="pizzaType-form" onSubmit={handleSubmit}>
      <p style={{ fontSize: "20px", margin: "0" }} >
        {updatableAllergenId === ""
          ?
          "NEW PIZZA TYPE FORM"
          :
          "Update pizza type"}
      </p>
      <div>
        <div>
          <input type="text" id="allergenName" placeholder="allergenName" value={actualAllergen.pizzaName || ""} required
            onChange={(e) => { setActualAllergen({ ...actualAllergen, allergenName: e.target.value }) }} />
        </div>
        <div>
          <button style={{ marginTop: "15px" }} type="submit" className="btn">Login</button>
        </div>
        <div>
          <button type="submit" id="submit-btn" className="btn" >
            {updatableAllergenId === ""
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

export default AllergenForm