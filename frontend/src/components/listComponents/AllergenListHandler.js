import { useEffect, useContext } from 'react';
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

function AllergenListHandler() {

  const { actualClientData, allAllergens, setAllAllergens } = useContext(MainContext);
  const { setUpdatableAllergenId, newOrModifiedAllergen, setNewOrModifiedAllergen } = useContext(Context);

  const allergenUrl = "/api/allergens"

  const allergensFetch = async (url) => {
    const response = await fetch(`${url}?isActive=true`);
    const data = await response.json();
    if (data) setAllAllergens(data);
  };

  useEffect(() => {
    allergensFetch(allergenUrl);
  }, [newOrModifiedAllergen]);

  function deleteAllergenFetch(actualEndPoint, allergenId) {

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    async function deleteAllergen() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newAllergenList = allAllergens.filter(allergen => allergen._id !== allergenId);
        setAllAllergens(newAllergenList)
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
        const newAllergenList = allAllergens.filter(allergen => allergen._id !== allergenId);
        setAllAllergens(newAllergenList)
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
    const actualAllergen = allAllergens.find(allergen => allergen._id === allergenId);
    setNewOrModifiedAllergen(actualAllergen)
  };
  
  return (
    <>
      {allAllergens && allAllergens !== undefined && allAllergens !== null && allAllergens.length > 0
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
            {allAllergens.map((allergen, index) => {
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