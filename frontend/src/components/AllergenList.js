import { useEffect, useState } from 'react';

export const AllergenList = () => {

  const allergensUrl = "http://localhost:8080/api/allergens"

  const [loading, setLoading] = useState(true);
  const [allergens, setAllergens] = useState([]);

  const allergensFetch = async (url) => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();
    if (data) setAllergens(data);
    setLoading(false)
  };

  useEffect(() => {
    allergensFetch(allergensUrl);
  }, []);

 // if (allergens.length > 0) console.log(allergens);


  function allergenHandler(e) {
    console.log(e.target);
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
