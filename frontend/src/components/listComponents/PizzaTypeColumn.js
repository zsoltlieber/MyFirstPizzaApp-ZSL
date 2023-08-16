import { useState, useEffect } from 'react';

function PizzaTypeColumn({ signedAllergens }) {

  const pizzaTypesUrl = 'http://localhost:8080/api/pizzaTypes';

  const [actualPizzas, setActualPizzas] = useState([]);
  const [wrongAllergens, setWrongAllergens] = useState([]);

  const pizzaTypeFetch = async (url) => {

    let newPizzaList = [];
    let wrongPizza = 0;
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < wrongAllergens.length; j++) {
          if (data[i].allergens.includes(wrongAllergens[j].allergenName)) {
            wrongPizza++;
          }
        }
        if (wrongPizza < 1) {
          newPizzaList.push(data[i])
        }
        wrongPizza = 0;
      }
      setActualPizzas(newPizzaList)
    };
  }
  useEffect(() => {
    pizzaTypeFetch(pizzaTypesUrl)
  }, [wrongAllergens]);

  useEffect(() => {
    setWrongAllergens(signedAllergens)
  }, [signedAllergens]);


  function addPizzaToOrder(pizzaId) {
    console.log(pizzaId)
  }

console.log(actualPizzas)

  return (
    <div className='centerColumn'>
      {actualPizzas.length > 0 && actualPizzas
        ? actualPizzas.map(pizza => {
          return (
            <div key={pizza._id} className="pizzaCard" id={pizza.pizzaName} data-price={pizza.pizzaPrice}>

              <img className="pizzaPicture" src={pizza.src} alt=''></img>

              <div>
                <div className="pizzaName">NAME:<br /> {pizza.pizzaName}</div>
                <div className="price">PRICE:<br />  {pizza.price.toLocaleString('en-US')}.- Ft</div>
                <div className="ingredients">INGREDIENTS:<br />  {pizza.ingredients.join(", ")}</div>
                <div className="allergenList">ALLERGENS:<br />  {pizza.allergens.join(", ")}</div>
                <div>
                  <button className="addToBasket" onClick={() => addPizzaToOrder(pizza._id)}>ADD TO BASKET</button>
                </div>
              </div>
            </div >
          )
        })
        : <>No available pizza with the non-checked allergens</>
      }
    </div >
  )

}

export default PizzaTypeColumn
