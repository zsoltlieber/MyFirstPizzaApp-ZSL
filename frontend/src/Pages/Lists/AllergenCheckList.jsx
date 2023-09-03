import { useEffect, useContext } from 'react';
import { MainContext } from '../../mainContext.js'

export const AllergenCheckList = () => {

  const { allAllergens, setAllAllergens, setRejectedAllergens } = useContext(MainContext);

  const allergensUrl = "/api/allergens"

  const allergensFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data) setAllAllergens(data);
  };

  function allergenStatusHandler(allergenId, checkboxStatus) {
    const modifiedAllergen = allAllergens.find(allergen => allergen._id === allergenId)
    modifiedAllergen.isChecked = checkboxStatus
    const signAllergens = allAllergens.filter(allergen => allergen.isChecked)
    setRejectedAllergens(signAllergens)
  }

  useEffect(() => {
    allergensFetch(allergensUrl);
  }, []);

  return (
    <div id='allergen-checker' >
      <div>
        <h4>CLICK YOUR ALLERGENS</h4>
      </div>
      {allAllergens && allAllergens !== undefined
        ? allAllergens.map((allergen, index) => {
          return (
            <div key={index}>
              <input className="allergen-checkbox" type='checkbox'
                onChange={(e) => allergenStatusHandler(allergen._id, e.target.checked)} />
              <div>{allergen.allergenName}</div>
            </div>
          )
        })
        : <></>
      }
    </div>
  )
}

export default AllergenCheckList