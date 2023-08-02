
import FetchData from './FetchData.js'

function PizzaTypeColumn() {

  const pizzaTypeUrl = 'http://localhost:8080/api/pizzaTypes'
  const allergensUrl = "http://localhost:8080/api/allergens"

  let { data } = FetchData(pizzaTypeUrl)
  const pizzaTypes = data

  function pizzaTypeHandler(e) {
    console.log(e.target)
  }
 
  data = FetchData(allergensUrl)
  const allergens=data
  console.log(allergens);


  return (
    <div className='centerColumn'>
      {pizzaTypes
        ? pizzaTypes.map(pizza => {
          return (
            <div key={pizza._id} className="pizzaCard" id={pizza.pizzaName} data-price={pizza.pizzaPrice}>

              <img className="pizzaPicture" src={pizza.src} alt=''></img>

              <div>
                <div className="pizzaName">NAME:<br /> {pizza.pizzaName}</div>
                <div className="price">PRICE:<br />  {pizza.price} Ft</div>
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
