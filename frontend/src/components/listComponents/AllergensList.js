import { useEffect, useState } from 'react';

export const AllergensList = ({ setRejectedAllergens }) => {

  const allergensUrl = "/api/allergens"

  const [allergens, setAllergens] = useState([]);

  const allergensFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data) setAllergens(data);
  };

  function allergenStatusHandler(allergenId, checkboxStatus) {
    const modifiedAllergen = allergens.find(allergen => allergen._id === allergenId)
    modifiedAllergen.isChecked = checkboxStatus
    const signAllergens = allergens.filter(allergen => allergen.isChecked)
    setRejectedAllergens(signAllergens)
  }

  useEffect(() => {
    allergensFetch(allergensUrl);
  }, []);

  return (
    <div className='leftColumn'>
      ALLERGENS
      {allergens
        ? allergens.map((allergen, index) => {
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

export default AllergensList