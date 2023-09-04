import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../mainContext.js'

function CenterColumn() {

  const { rejectedAllergens, setPizzaIdToOrder, setAllPizzaTypes, newOrModifiedPizzaType, itemIsActiveStatus } = useContext(MainContext);

  const pizzaTypesUrl = '/api/pizzaTypes';
  const [actualPizzas, setActualPizzas] = useState({});

  const pizzaTypeFetch = async (url) => {
    const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
    let newPizzaList = [];
    let wrongPizza = 0;
    const response = await fetch(actualUrl);
    const data = await response.json();
    if (response.status === 200) {
      setAllPizzaTypes(data)
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < rejectedAllergens.length; j++) {
          if (data[i].allergens.includes(rejectedAllergens[j].allergenName)) {
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
  }, [rejectedAllergens, newOrModifiedPizzaType]);

  function addPizzaIdToOrder(pizzaId) {
    setPizzaIdToOrder(pizzaId)
  }

  return (
    <div id='center-column'>
      {actualPizzas && actualPizzas.length > 0
        ? actualPizzas.map((pizza, index) => {
          return (
            <div key={index} className="pizza-card" id={pizza.pizzaName} data-price={pizza.pizzaPrice}>

              <img className="pizza-picture" src={pizza.src} alt=''></img>

              <div>
                <div className="pizza-name">NAME:<br /> {pizza.pizzaName}</div>
                <div className="price">PRICE:<br />  {pizza.price.toLocaleString('en-US')}.- Ft</div>
                <div className="ingredients">INGREDIENTS:<br />  {pizza.ingredients.join(", ")}</div>
                <div className="allergen-list">ALLERGENS:<br />  {pizza.allergens.join(", ")}</div>
                <div>
                  <button className="add-to-basket" onClick={() => addPizzaIdToOrder(pizza._id)}>ADD TO BASKET</button>
                </div>
              </div>
            </div >
          )
        })
        : <div id="empty-pizza-list-message">No available pizza without the checked allergens ! </div>
      }
    </div >
  )
}

export default CenterColumn