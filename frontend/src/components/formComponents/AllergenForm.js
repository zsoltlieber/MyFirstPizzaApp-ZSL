import { useContext } from "react";
import { Context } from "./../../context.js"

function AllergenForm() {

  const { allAllergens, newOrModifiedAllergen, setNewOrModifiedAllergen,
    updatableAllergenId, setUpdatableAllergenId } = useContext(Context);

  const allergensUrl = "/api/allergens"

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newOrModifiedAllergen !== "" && updatableAllergenId === "" &&
      allAllergens.includes(newOrModifiedAllergen)) {

      const saveOnServer = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrModifiedAllergen)
        };
        const response = await fetch(allergensUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
          console.log(data)
        }
        else {
          console.log("New allergen was saved!")
        }
      }
      saveOnServer()
    }
    else if (newOrModifiedAllergen.allergenName !== "" && updatableAllergenId !== "") {


      const updateOnServer = async () => {
        const updatableAllergenUrl = allergensUrl + "/" + updatableAllergenId;

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
          console.log("Modified allergen was saved!")
        }
        setUpdatableAllergenId("");
        setNewOrModifiedAllergen("");
      }
      updateOnServer()
    }
    else console.log("Wrong data - no modification!")
  }
  function cancelButton() {
    setUpdatableAllergenId("");
    setNewOrModifiedAllergen("")
  }

  return (
    <form id="allergen-form" onSubmit={handleSubmit}>
      <p style={{ fontSize: "20px", margin: "0" }} >
        {updatableAllergenId === "" || updatableAllergenId === undefined
          ?
          "ALLERGEN FORM"
          :
          "Update allergen"}
      </p>
      <div>
        <div>
          <input type="text" id="allergenName" placeholder="allergenName" value={newOrModifiedAllergen.allergenName || ""} required
            onChange={(e) => { setNewOrModifiedAllergen({ ...newOrModifiedAllergen, allergenName: e.target.value }) }} />
        </div>
        <div>
          <button type="submit" id="submit-btn" className="btn" >
            {updatableAllergenId === "" || updatableAllergenId === undefined
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

export default AllergenForm