import { useEffect } from 'react';

const ActiveOrdersList = ({ actualClientData, listOfOrdersDataSet, setListOfOrdersData }) => {

  const ordersUrl = `/api/orders`

  let totalAmount = 0;

  const orderFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
   //   data.map(order => console.log(order))
      setListOfOrdersData(data);
    }
  };

  useEffect(() => {
    orderFetch(ordersUrl);
  }, [ordersUrl]);


  const removeOrdeleteOrder = (orderId) => {
    const actualEndPoint = ordersUrl + "/" + orderId;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false })
    };
    if (actualClientData.clientName !== "") {
      if (actualClientData.bossStatus !== true) {
        async function removeOrder() {
          const response = await fetch(actualEndPoint, requestOptions);
          if (response.status === 200) {
            console.log('Remove successful');
          } else {
            console.log("Do not want to modify other's order!")
          }
        }
        removeOrder();

      } else {
        async function deleteOrder() {
          await fetch(actualEndPoint, { method: 'DELETE' });
          console.log('Delete successful');
        }
        deleteOrder();
      }
    }
  }

  function updateOrder(orderId) {
    console.log("coming soon this update functionality ")
    console.log("pizza id =  " + orderId)
  }


  //console.log(listOfOrdersDataSet);
  return (
    <>
      {actualClientData.clientName !== "" && listOfOrdersDataSet != null
        ?
        < div id="orderList" >
          <div style={{ color: "white" }}>
            <p>DEAR {actualClientData.clientName} </p>
            <p style={{ textDecoration: "underline" }}>Current active orders:</p>
            {/*
            {listOfOrdersDataSet && listOfOrdersDataSet !== null
              ? listOfOrdersDataSet.map(order => (
                <div key={order._id}>
                  <p style={{ backgroundColor: "blue" }}>{order.orderClientId.toUpperCase()}</p>
                  <ul>
                    {order.orderedItems !== undefined && order.orderedItems
                      ? order.orderedItems.map((orderItem, index) => {
                        //  actualPizzaData = pizzaTypesDataSet.find(pizza => pizza._id === orderItem._id)
                        //  actualPizzaData = pizzaTypesDataSet[index]
                        totalAmount = totalAmount + (orderItem.quantity || 1) * //actualPizzaData.price
                          console.log(orderItem.quantity)
                        return (
                          <div key={index}>

                            <span>
                              <li>=============================</li>
                              <li>Pizza type: {actualPizzaData.pizzaName}</li>
                              <li>Price: {actualPizzaData.price.toLocaleString('en-US')}.- Ft</li>
                              <li>Quantity: {orderItem.quantity}</li>
                              {actualClientData.staffStatus === true
                                ?
                                <div>
                                  <button id="delete-btn" type='delete' value={actualPizzaData._id} onClick={(e) => removeOrdeleteOrder(e.target.value)}>DELETE</button>
                                  <button id="update-btn" type='update' value={actualPizzaData._id} onClick={(e) => updateOrder(e.target.value)}>UPDATE</button>
                                </div>
                                :
                                <></>
                              }
                            </span>
                            <li>=============================</li>

                          </div>
                        )
                      })
                      : <></>
                    }
                  </ul >
                  <p>Total cost: {totalAmount.toLocaleString('en-US')}.- Ft</p>
                  {totalAmount = 0};
                </div >
              ))
              : <></>
            }
          */}

          </div >
        </div >
        : <></>
      }
    </>
  )
}

export default ActiveOrdersList