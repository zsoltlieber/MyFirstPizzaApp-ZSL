import { useEffect, useState } from 'react';

export const AllergensList = ({ sendRejectedAllergens }) => {

  const allergensUrl = "http://localhost:8080/api/allergens"

  const [allergens, setAllergens] = useState([]);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);

  const allergensFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data) setAllergens(data);
  };

  useEffect(() => {
    allergensFetch(allergensUrl);
  }, []);

  function allergenHandler() {
    setRejectedAllergens(...allergens)
    const checkBoxes = Object(document.querySelectorAll(".allergen-checkbox"));
    rejectedAllergens.map((item, index) => item.isChecked = checkBoxes[index].checked)
    rejectedAllergens.filter(item => item.isChecked === true)
  }
  //sendRejectedAllergens(rejectedAllergens);

  return (
    <div className='leftColumn'>
      {allergens
        ? allergens.map((allergen, index) => {
          return (
            <div key={index}>
              <input className="allergen-checkbox" id={allergen._id} value={allergen.allergenName} type='checkbox'
                onChange={allergenHandler} />
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
