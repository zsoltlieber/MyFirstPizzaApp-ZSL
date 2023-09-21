import { useAllergenContext } from '../../contexts/AllergenContextProvider.jsx';

function AllergenListHandler() {
  const { allAllergens, setNewOrModifiedAllergen,
    setUpdatableAllergenId, deleteAllergen } = useAllergenContext();


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
                      <button type="text" id="delete-btn" value={allergen._id} onClick={(e) => deleteAllergen(e.target.value)}>DEL </button>
                    </td>
                    <td >
                      <button type='text' id="update-btn" value={allergen._id} onClick={(e) => updateItem(e.target.value)}>UPD</button>
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

export default AllergenListHandler