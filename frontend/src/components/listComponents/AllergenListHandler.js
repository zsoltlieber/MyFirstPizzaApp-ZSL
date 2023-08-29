import { useContext } from 'react';
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

function AllergenListHandler() {

  const { actualClientData, allergens, setAllergens } = useContext(MainContext);
  const { setUpdatableAllergenId, setNewAllergen } = useContext(Context);

  const allergenUrl = "/api/allergens"

  function deleteAllergenFetch(actualEndPoint, allergenId) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    async function deleteAllergen() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newAllergenList = allergens.filter(allergen => allergen._id !== allergenId);
        setAllergens(newAllergenList)
        console.log('Delete successful');
      } else {
        console.log("Problem with allergen delete!")
      }
    }
    deleteAllergen();
  };

  function removeAllergenFetch(actualEndPoint, allergenId) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false })
    };
    async function removeAllergen() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newAllergenList = allergens.filter(allergen => allergen._id !== allergenId);
        setAllergens(newAllergenList)
        console.log('Remove successful');
      } else {
        console.log("Do not want to modify other's allergens!")
      }
    }
    removeAllergen();
  };

  const deleteAllergenRow = (allergenId) => {
    const actualEndPoint = allergenUrl + "/" + allergenId;

    if (actualClientData.bossStatus === true) {
      deleteAllergenFetch(actualEndPoint, allergenId);
    }
    else if (actualClientData !== undefined && actualClientData.clientName !== "") {
      removeAllergenFetch(actualEndPoint, allergenId);
    }
  };

  const updateItem = (allergenId) => {
    setUpdatableAllergenId(allergenId);
    const actualAllergen = allergens.find(allergen => allergen._id === allergenId);
    setNewAllergen(actualAllergen)
  };

  console.log(allergens);
  return (
    <>
      {allergens && allergens !== undefined && allergens.length > 0
        ?
        < div id='allergen-list' >
          <p style={{ textAlign: "center", fontSize: "20px", margin: "0" }} >ALLERGEN LIST</p>

          <table id="allergen-list-table">
            <thead>
              <tr>
                <th>Allergen name</th>
                <th></th>
              </tr>
            </thead>
            {allergens.map((allergen, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td><p>{allergen.allergenName}</p></td>
                    <td >
                      <button type="button" id="delete-btn" value={allergen._id} onClick={(e) => deleteAllergenRow(e.target.value)}>DEL </button>
                    </td>
                    <td >
                      <button type='button' id="update-btn" value={allergen._id} onClick={(e) => updateItem(e.target.value)}>UPD</button>
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

export default AllergenListHandler