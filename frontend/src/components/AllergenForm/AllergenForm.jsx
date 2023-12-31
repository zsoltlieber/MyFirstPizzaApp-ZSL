import { useRightColumnType } from "../../contexts/RightColumnTypeContextProvider.jsx";
import { useAllergenContext } from "../../contexts/AllergenContextProvider.jsx";

function AllergenForm() {
  const { setRightColumnType } = useRightColumnType()
  const { allAllergens, newOrModifiedAllergen, setNewOrModifiedAllergen,
    updatableAllergenId, setUpdatableAllergenId } = useAllergenContext();

  const allergensUrl = "/api/allergens"

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newOrModifiedAllergen !== "" && updatableAllergenId === "") {

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
          setNewOrModifiedAllergen("");
          console.log("New allergen was saved!")
        }
      }
      if (allAllergens.find(allergen => allergen.allergenName === newOrModifiedAllergen.allergenName) === undefined) {
        saveOnServer()
      }
      else {
        setNewOrModifiedAllergen("");
        console.log("The allergen has already saved!")

      }
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
          setUpdatableAllergenId("");
          setNewOrModifiedAllergen("");
          console.log("Modified allergen was saved!")
        }
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
        {updatableAllergenId === undefined || updatableAllergenId === ""
          ?
          "ALLERGEN FORM"
          :
          "Update allergen"}
      </p>
      <div>
        <div>
          <input type="text" id="allergenName" placeholder="allergenName"
            value={newOrModifiedAllergen.allergenName || ""} required
            onChange={(e) => { setNewOrModifiedAllergen({ ...newOrModifiedAllergen, allergenName: e.target.value }) }} />
        </div>
        <div>
          <button type="submit" id="submit-btn" className="btn" >
            {updatableAllergenId === undefined || updatableAllergenId === ""
              ?
              "Submit"
              :
              "Update"}
          </button>
          <button type="text" className="btn" onClick={cancelButton}>Cancel</button>
          <button type="text" className="btn" value={"about"} onClick={(e) => setRightColumnType(e.target.value)}>BACK</button>
        </div>
      </div>
    </form>
  )
}

export default AllergenForm