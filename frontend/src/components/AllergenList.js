import { useEffect, useState } from 'react';

export const AllergenList = () => {

  const allergensUrl = "http://localhost:8080/api/allergens"

  const [allergens, setAllergens] = useState([]);

  const allergensFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data) setAllergens(data);
  };

  useEffect(() => {
    allergensFetch(allergensUrl);
  }, [allergens]);

  function allergenHandler() {
    const checkBoxes = Object(document.querySelectorAll(".allergen-checkbox"));
    let newList = [];
    for (let i = 0; i < allergens.length; i++) {
      newList.push(allergens[i].isChecked = checkBoxes[i].checked)
    }
    setAllergens(allergens)
  }

  return (
    <div className='leftColumn'>
      {allergens
        ? Object.values(allergens).map((allergen, index) => {
          return (
            <div key={index}>
              <input className="allergen-checkbox" id={allergen._id} value={allergen.allergenName} type='checkbox' onClick={allergenHandler} />
              <div>{allergen.allergenName}</div>
            </div>
          )
        })
        : <></>
      }
    </div>
  )
}

export default AllergenList
