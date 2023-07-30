import FetchData from "./FetchData.js";

const OrderList = () => {

  const orderUrl = "http://localhost:8080/api/orders"
  const { orders } = FetchData(orderUrl)
  const pizzaTypesUrl = "http://localhost:8080/api/pizzaTypes"
  const { pizzaTypes } = FetchData(pizzaTypesUrl)

  if(orders!=null) console.log(orders);
  if (pizzaTypes != null) console.log(pizzaTypes);



  return (
    <div className='rightColumn'>
      <h1>ORDERLIST</h1>
    <div id="orderList">
        {orders && orders != null
          ? orders.map(order => (
          <div key={order._id}>
            {order.orderClientId}
          </div>
        ))
        : <></>
      }
    </div>
    </div>
  )
}

export default OrderList