import { useState, useEffect } from 'react';

function PizzaTypeColumn({ rejectedAllergensSet, setAllPizzaTypesData, setActualPizzaIdToOrder }) {

  const pizzaTypesUrl = '/api/pizzaTypes';
  const [actualPizzas, setActualPizzas] = useState();

  const pizzaTypeFetch = async (url) => {

    let newPizzaList = [];
    let wrongPizza = 0;
    const response = await fetch(`${url}?isActive=true`);
    const data = await response.json();
    if (response.status === 200) {
      setAllPizzaTypesData(data)
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < rejectedAllergensSet.length; j++) {
          if (data[i].allergens.includes(rejectedAllergensSet[j].allergenName)) {
            wrongPizza++;
          }
        }
        if (wrongPizza < 1) {
          newPizzaList.push(data[i])
        }
        wrongPizza = 0;
      }
    }
    setActualPizzas(newPizzaList)
  };

  useEffect(() => {
    pizzaTypeFetch(pizzaTypesUrl)
  }, [rejectedAllergensSet]);

  function addPizzaIdToOrder(pizzaId) {
    setActualPizzaIdToOrder(pizzaId)
  }

  return (
    <div className='centerColumn'>
      {actualPizzas && actualPizzas.length > 0
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
                  <button className="addToBasket" onClick={() => addPizzaIdToOrder(pizza._id)}>ADD TO BASKET</button>
                </div>
              </div>
            </div >
          )
        })
        : <h1 id="empty-pizzalist">No available pizza with the checked allergens ! </h1>
      }
    </div >
  )

}

export default PizzaTypeColumn