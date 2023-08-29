import { useContext } from "react";
import { Context } from "./../../context.js"

function AllergenForm() {

  const { updatableAllergenId, setUpdatableAllergenId, newOrModifedAllergen, setNewOrModifiedAllergen } = useContext(Context);

  const allergensUrl = "/api/allergens"

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newOrModifedAllergen.allergenName !== "" && updatableAllergenId === "") {

      const saveOnServer = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrModifedAllergen)
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
    else if (newOrModifedAllergen.allergenName !== "" && updatableAllergenId !== "") {


      const updateOnServer = async () => {
        const updatableAllergenUrl = allergensUrl + "/" + updatableAllergenId;
        console.log(updatableAllergenUrl);
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrModifedAllergen)
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
        setNewOrModifiedAllergen({ allergenName: "" });
      }
      updateOnServer()
    }
    else console.log("Wrong data - no modification!")
  }
  function cancelButton() {
    setUpdatableAllergenId("");
    setNewOrModifiedAllergen({ allergenName: "" })
  }
console.log(newOrModifedAllergen)
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
          <input type="text" id="allergenName" placeholder="allergenName" value={newOrModifedAllergen.allergenName || ""} required
            onChange={(e) => { setNewOrModifiedAllergen({ ...newOrModifedAllergen, allergenName: e.target.value }) }} />
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