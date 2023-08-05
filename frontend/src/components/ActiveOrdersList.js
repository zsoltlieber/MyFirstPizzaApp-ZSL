import { useState, useEffect } from 'react';

const ActiveOrdersList = () => {

  
  const currentClientId = "a587e62c-b71a-4803-953b-ffc16a5cf587";
 // const currentOrderId = "36a663fa-3304-4d74-a5f9-bafd260618f7";
  const currentOrderId = "";
  const currentPizzaTypeId = "";
  //const currentPizzaTypeId = "64cdf8f6dd371f8a3c8f7fa6";  //TODO try to get only one pizza type!!

  const clientUrl = `http://localhost:8080/api/clients/${currentClientId}`
  const ordersUrl = `http://localhost:8080/api/orders/${currentOrderId}`
  const pizzaTypesUrl = `http://localhost:8080/api/pizzaTypes/${currentPizzaTypeId}`

  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});
  const [orders, setOrders] = useState([]);
  const [pizzaTypes, setPizzaTypes] = useState([]);

  const clientFetch = async (url) => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();
    if (data) setClient(data);
    setLoading(false)
  };
  
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
    clientFetch(clientUrl);
  }, [clientUrl]);

  useEffect(() => {
    orderFetch(ordersUrl);
  }, [ordersUrl]);

  useEffect(() => {
    pizzaTypeFetch(pizzaTypesUrl)
  }, [pizzaTypesUrl]);

  if (loading) console.log("JUST LOADING");
  if (client.length > 0) console.log(client);
  //if (pizzaTypes.length > 0) console.log(pizzaTypes);
 // if (orders.length > 0) console.log(orders);

  return (
    <div >
      <div id="orderList" style={{ color: "white" }}>
        <p>DEAR {client.clientName} </p>
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