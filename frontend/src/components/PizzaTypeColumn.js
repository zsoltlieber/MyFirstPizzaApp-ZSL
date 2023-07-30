import FetchData from './FetchData.js'

function PizzaTypeColumn() {

  const pizzaTypeUrl = 'http://localhost:8080/api/pizzaTypes'
  
  const { data } = FetchData(pizzaTypeUrl)
  const pizzaTypes = data

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
                <div class="pizzaName">NAME:<br /> {pizza.pizzaName}</div>
                <div class="price">PRICE:<br />  {pizza.price} Ft</div>
                <div class="ingredients">INGREDIENTS:<br />  {pizza.ingredients.join(", ")}</div>
                <div class="allergenList">ALLERGENS:<br />  {pizza.allergens.join(", ")}</div>
                <div>
                  <button class="addToBasket" onClick={pizzaTypeHandler}>ADD TO BASKET</button>
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
