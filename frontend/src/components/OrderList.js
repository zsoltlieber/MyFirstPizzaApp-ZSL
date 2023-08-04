import { useState, useEffect } from 'react';

const OrderList = () => {

  const ordersUrl = "http://localhost:8080/api/orders"
  const pizzaTypesUrl = "http://localhost:8080/api/pizzaTypes"

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [pizzaTypes, setPizzaTypes] = useState([]);

  const pizzaTypeFetch = async (url) => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();
    if (data) setPizzaTypes(data);
    setLoading(false)
  };

  const orderFetch = async (url) => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();
    if (data) setOrders(data);
    setLoading(false)
  };

  useEffect(() => {
    orderFetch(ordersUrl);
    pizzaTypeFetch(pizzaTypesUrl)
  }, []);

  //if (pizzaTypes.length > 0) console.log(pizzaTypes);
  if (orders.length > 0) console.log(orders);

  return (
    <div >
      <div id="orderList" style={{ color: "white" }}>
        RENDELÉSEK
        {orders !== undefined && orders !== null
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