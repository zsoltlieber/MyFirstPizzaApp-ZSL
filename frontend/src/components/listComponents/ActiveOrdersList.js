import { useState, useEffect } from 'react';

const ActiveOrdersList = () => {
  const userName = localStorage.getItem('userName_myapp');

  const ordersUrl = `http://localhost:8080/api/orders/`
  const pizzaTypesUrl = `http://localhost:8080/api/pizzaTypes/`

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

  return (
    <div >
      <div id="orderList" style={{ color: "white" }}>
        <p>DEAR {userName} </p>
        <p style={{textDecoration:"underline"}}>Current active orders:</p>
        {orders !== undefined && orders !== null
        /*
          ? orders.map(order => (
            <div key={order._id}>
              <p>{order.orderClientId}</p>
              <ul>
                {order.orderedItems !== undefined && order.orderedItems !== null
                  ? order.orderedItems.map((orderItem, index) => {
                    return (
                      <div key = {index}>
                        <li>{orderItem.pizzaId}</li>
                        <li>{orderItem.pricePerEach}</li>
                        <li>{orderItem.quantity}</li>
                        <li>

                        </li>
                      </div>
                    )
                  })
                  : <></>
                }
              </ul>

            </div>
          ))
          : <></>
          */
        }
      </div>
    </div>
  )
}

export default ActiveOrdersList