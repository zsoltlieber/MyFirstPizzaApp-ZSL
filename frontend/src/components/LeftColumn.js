import React, { useEffect, useState } from 'react'

export const LeftColumn = () => {

  const [allergens, setAllergens] = useState(null)

  function allergenHandler(e) {
  console.log(e.target)
  }

  const allergenUrl = 'http://localhost:8080/api/allergens'
  useEffect(() => {
    fetch(allergenUrl)
      .then((response) => response.json())
      .then((data) => setAllergens(data))
  }, [])
console.log(allergens[0])
  return (
    <div className='leftColumn'>

      {allergens
        ? allergens.map((allergen, index) => (
          <div key={index}>
            <input id={index} value={allergen.allergenName} type='checkbox' onClick={allergenHandler} />
            <div>{allergen.allergenName}</div>  
          </div>
        ))
        : <></>
      }
    </div>
  )
}

export default LeftColumn
