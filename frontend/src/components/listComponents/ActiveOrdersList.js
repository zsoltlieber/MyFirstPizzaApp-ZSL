import { useState, useEffect } from 'react';

const ActiveOrdersList = ({ actualClientData }) => {

  const ordersUrl = `/api/orders`
  const pizzaTypesUrl = `/api/pizzaTypes`

  const [orders, setOrders] = useState([]);
  const [pizzaTypes, setPizzaTypes] = useState([]);

  const pizzaTypeFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data) setPizzaTypes(data);
  };

  const orderFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data) setOrders(data);
  };

  useEffect(() => {
    orderFetch(ordersUrl);
  }, [ordersUrl]);

  useEffect(() => {
    pizzaTypeFetch(pizzaTypesUrl)
  }, [pizzaTypesUrl]);

  console.log(orders)
  let actualPizzaData;
  let totalAmount = 0;

  return (
    <div id="orderList">
      <div style={{ color: "white" }}>
        <p>DEAR {actualClientData.clientName} </p>
        <p style={{ textDecoration: "underline" }}>Current active orders:</p>
        {orders && orders !== null
          ? orders.map(order => (
            <div key={order._id}>
              <p style={{ backgroundColor: "blue" }}>{order.orderClientId.toUpperCase()}</p>
              <ul>
                {order.orderedItems !== undefined && order.orderedItems !== null
                  ? order.orderedItems.map((orderItem, index) => {
                    actualPizzaData = pizzaTypes[index]
                    totalAmount = totalAmount + (orderItem.quantity || 1) * actualPizzaData.price
                    console.log(orderItem.quantity)
                    return (
                      <div key={index}>
                        <li>Pizza type: {actualPizzaData.pizzaName}</li>
                        <li>Price: {actualPizzaData.price.toLocaleString('en-US')}.- Ft</li>
                        <li>Quantity: {orderItem.quantity}</li>
                        <li>=============================</li>
                      </div>
                    )
                  })
                  : <></>
                }
              </ul>
              <p>Total cost: {totalAmount}</p>
              {totalAmount = 0};
            </div>
          ))
          : <></>

        }
      </div>
    </div>
  )
}

export default ActiveOrdersList