const ActiveOrdersList = ({ actualClientDataSet, listOfOrders, pizzaTypesDataSet }) => {

  const ordersUrl = `/api/orders`

  let totalAmount = 0;
  

  console.log(listOfOrders);

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


  function deleteOrderRow(orderId) {
    console.log("coming soon this delete functionality ")
    console.log("pizza id =  " + orderId)
  }

  return (
    <>
      {listOfOrders.orderedItems && listOfOrders.orderedItems !== undefined
        ?
        < div id="orderList" >
          <div style={{ color: "white" }}>
            <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
            <p style={{ backgroundColor: "blue" }}>{actualClientDataSet.clientId === listOfOrders.orderClientId ? actualClientDataSet.clientName.toUpperCase() : actualClientDataSet.clientName}</p>

            <table style={{ listStyleType: "none", fontSize: "15px" }}>
              <tr>
                <th>Pizza name</th>
                <th>Quantity</th>
                <th>Price each</th>
                <th>Price each</th>
              </tr>
              {listOfOrders.orderedItems.map(order => {
                return (
                  <div key={order.pizzaId}>
                    <tr>
                      <td style={{ marginLeft: "-3rem" }} className='orderElement'>
                        {order.pizzaId}
                      </td>
                      <td>{order.quantity}</td>
                      <td>{order.pricePerEach}</td>
                      <td>
                        <button style={{ backgroundColor: "red", color: "white", marginLeft: "10px", width: "40px" }} type="button"
                          id="delete-btn" className="btn" onClick={(e) => deleteOrderRow(order.pizzaId)}>
                          DEL
                        </button>
                      </td>
                    </tr>
                  </div>
                )
              })}
            </table>
            Total cost: {0}
          </div >
        </div >
        : <></>
      }
    </>
  )
}

export default ActiveOrdersList