const ActiveOrdersList = ({ actualClientDataSet, listOfOrders, pizzaTypesDataSet }) => {

  const ordersUrl = `/api/orders`

  let totalAmount = 0;
  let actualPizzaData = undefined;
  console.log("itt lista");
  console.log("ez az " + listOfOrders);
  if (listOfOrders.orderedItems !== undefined) {
    console.log(listOfOrders.orderedItems);
    console.log(listOfOrders.orderedItems[0]);
    console.log(listOfOrders.orderedItems[1]);
  }

  const removeOrdeleteOrder = (orderId) => {
    const actualEndPoint = ordersUrl + "/" + orderId;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false })
    };
    if (actualClientDataSet.clientName !== "") {
      if (actualClientDataSet.bossStatus !== true) {

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
  console.log("itt");
  console.log(listOfOrders);
  console.log(listOfOrders !== undefined);
  return (
    <>
      {actualClientDataSet !== undefined && actualClientDataSet.clientName !== "" && listOfOrders !== undefined && listOfOrders.orderClientId !== undefined
        ?
        < div id="orderList" >
          <div style={{ color: "white" }}>
            <h2 style={{ textDecoration: "underline" }}>Current active orders:</h2>
            <p style={{ backgroundColor: "blue" }}>{actualClientDataSet.clientId === listOfOrders.orderClientId ? actualClientDataSet.clientName.toUpperCase() : actualClientDataSet.clientName}</p>

            {listOfOrders.orderedItems && listOfOrders.orderedItems !== undefined
              ? listOfOrders.orderedItems.map(order => (
                <div key={order._id}>
                  <ul>
                    {order.orderedItems !== undefined && order.orderedItems
                      ? order.orderedItems.map((orderItem, index) => {
                        actualPizzaData = pizzaTypesDataSet.find(pizza => pizza._id === orderItem._id)
                        actualPizzaData = pizzaTypesDataSet[index]
                        totalAmount = totalAmount + (orderItem.quantity) * actualPizzaData.price
                        console.log(orderItem.quantity)
                        return (
                          <div key={index}>
                            <span>
                              <li>=============================</li>
                              <li>
                                name{actualPizzaData.pizzaName}
                                {actualPizzaData.price.toLocaleString('en-US')}.- Ft
                                {orderItem.quantity} db
                                <button style={{ backgroundColor: "red", color: "white", marginLeft: "10px", width: "40px" }} type="button"
                                  id="delete-btn" className="btn" onClick={(e) => removeOrdeleteOrder(actualPizzaData._id)}>
                                  DEL
                                </button>
                                <button id="update-btn" type='button' value={actualPizzaData._id} onClick={(e) => updateOrder(e.target.value)}>UPDATE</button>
                              </li>
                              {actualClientDataSet.staffStatus === true
                                ?
                                <div>
                                  {/* 
                                  <button id="delete-btn" type='delete' value={actualPizzaData._id} onClick={(e) => removeOrdeleteOrder(e.target.value)}>DELETE</button>

    const deleteItem = (deletedOrderItemId) => {
                                    console.log(deletedOrderItemId)
                                    //        const modifiedActualOrderItems = actualOrderItems.filter(item => item.pizzaId !== deletedOrderItemId)
                                    //      console.log(modifiedActualOrderItems);
                                    //  setActualOrderItems(modifiedActualOrderItems)
                                  }
 */}

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
          </div >
        </div >
        : <></>
      }
    </>
  )
}

export default ActiveOrdersList