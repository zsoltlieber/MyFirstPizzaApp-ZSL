import { useState, useEffect } from 'react';

function PizzaTypeColumn({ allergensSet  }) {

  const pizzaTypesUrl = 'http://localhost:8080/api/pizzaTypes';

  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [wrongAllergens, setWrongAllergens] = useState([]);

  const pizzaTypeFetch = async (url) => {

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
   //   data.filter(item=>!item.allergens.contain(activeAllergens))
    }
    console.log(data)
    console.log(allergensSet)

    if (data) setPizzaTypes(data);
  };

  useEffect(() => {
    setWrongAllergens(allergensSet)
  }, [allergensSet]);

  useEffect(() => {
    pizzaTypeFetch(pizzaTypesUrl)
  }, [pizzaTypesUrl]);

 // if (pizzaTypes.length > 0) console.log(pizzaTypes);
 // if (allergens.length > 0) console.log(allergens);

  function pizzaTypeHandler(e) {
    console.log(e.target)
  }


  return (
    <div className='centerColumn'>
      {pizzaTypes
        ? pizzaTypes.map(pizza => {
          return (
            <div key={pizza._id} className="pizzaCard" id={pizza.pizzaName} data-price={pizza.pizzaPrice}>

              <img className="pizzaPicture" src={pizza.src} alt=''></img>

              <div>
                <div className="pizzaName">NAME:<br /> {pizza.pizzaName}</div>
                <div className="price">PRICE:<br />  {pizza.price.toLocaleString('en-US')}.- Ft</div>
                <div className="ingredients">INGREDIENTS:<br />  {pizza.ingredients.join(", ")}</div>
                <div className="allergenList">ALLERGENS:<br />  {pizza.allergens.join(", ")}</div>
                <div>
                  <button className="addToBasket" value={pizza._id} onClick={pizzaTypeHandler}>ADD TO BASKET</button>
                </div>
              </div>
            </div >
          )
        })
        : <></>
      }
    </div >
  )
}

export default PizzaTypeColumn
