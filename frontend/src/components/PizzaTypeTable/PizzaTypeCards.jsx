import { useEffect, useState } from 'react';
import { usePizzaTypeContext } from '../../contexts/PizzaTypeContextProvider.jsx';
import { useAllergenContext } from '../../contexts/AllergenContextProvider.jsx';
import { useOrderContext } from '../../contexts/OrderContextProvider.jsx';

function PizzaTypeCards() {

  let { rejectedAllergens } = useAllergenContext();
  const { allPizzaTypes, setPizzaIdToOrder } = usePizzaTypeContext();

  const [actualPizzas, setActualPizzas] = useState([]);

  useEffect(() => {
    let newPizzaList;
    let wrongPizza = 0;
    if (rejectedAllergens.length === 0) {
      newPizzaList = allPizzaTypes
    }
    else {
      newPizzaList = [];

      for (let i = 0; i < allPizzaTypes.length; i++) {
        for (let j = 0; j < rejectedAllergens.length; j++) {
          if (allPizzaTypes[i].allergens.includes(rejectedAllergens[j].allergenName)) {
            wrongPizza++;
          }
        }
        if (wrongPizza < 1) {
          newPizzaList.push(allPizzaTypes[i])
        }
        wrongPizza = 0;
      }
    }
    setActualPizzas(newPizzaList)
  }, [allPizzaTypes, rejectedAllergens])


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

export default PizzaTypeCards