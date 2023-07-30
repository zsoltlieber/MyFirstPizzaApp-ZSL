import FetchData from './FetchData.js'

export const AllergenList = () => {
  const allergensUrl = "http://localhost:8080/api/allergens"


  const { data } = FetchData(allergensUrl)
  const allergens = data

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
