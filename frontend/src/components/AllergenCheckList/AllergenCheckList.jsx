import { useEffect,} from 'react';
import { useAllergenContext } from '../../contexts/AllergenContextProvider';

export const AllergenCheckList = () => {

  const { allAllergens, setAllAllergens, setRejectedAllergens } = useAllergenContext();

  const allergensUrl = "/api/allergens"

  const allergensFetch = async (url) => {
    try {
      const response = await fetch(url);
      let data = await response.json();
      if (data.length !== 0) setAllAllergens(data);
    } catch (error) {
      console.log(error)
    }
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
      {allAllergens
        ? allAllergens.map((allergen, index) => {
          return (
            <div key={index}>
              <input className="allergen-checkbox" type='checkbox'
                onChange={(e) => allergenStatusHandler(allergen._id, e.target.checked)} />
              <div>{allergen.allergenName}</div>
            </div>
          )
        })
        : null
      }
    </div>
  )
}

export default AllergenCheckList