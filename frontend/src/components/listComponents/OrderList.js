import { useEffect } from "react";

const OrdersList = ({ actualClientDataSet, listOfOrdersSet, setOrdersList, pizzaTypesDataSet, showPreOrderListSet }) => {

  const ordersUrl = `/api/orders`
  let grandTotalCost = 0;
  let actualPizzaName = "";

  const orderFetch = async (url) => {
    const response = await fetch(`${url}?isActive=true`);
    const data = await response.json();
    if (data) setOrdersList(data);
  };

  useEffect(() => {
    orderFetch(ordersUrl);
  }, []);

  const deleteOrderRow = (orderId, orderItemId) => {

    console.log(listOfOrdersSet);
    console.log(orderId)
    console.log(orderItemId)
    let originalOrders = listOfOrdersSet.filter(orderItemId => orderItemId._id !== orderId)
    const modifyOrder = listOfOrdersSet.filter(orderItemId => orderItemId._id === orderId)
    const modifyOrderItems = modifyOrder[0].orderedItems.filter(orderItemId => orderItemId._id !== orderItemId)
    console.log(modifyOrderItems);
    modifyOrder.orderedItems = modifyOrderItems;
    console.log(modifyOrder[0]);
    originalOrders.push(modifyOrder)
    //}

    //setOrdersList([...originalOrders, modifyOrder])

  }


  return (
    <div>
      {listOfOrdersSet && listOfOrdersSet.length > 0 && actualClientDataSet.clientName !== "" && !showPreOrderListSet
        ?
        < div id="order-list" >
          <div >
            <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
            <p style={{ backgroundColor: "blue", width: "fit-content" }}>{actualClientDataSet.clientId === listOfOrdersSet.orderClientId ? actualClientDataSet.clientName.toUpperCase() : actualClientDataSet.clientName}</p>

            <table id="order-list-table" style={{ listStyleType: "none", fontSize: "15px" }}>
              <thead>
                <tr>
                  <th>Pizza name</th>
                  <th>Piece</th>
                  <th>Price each</th>
                  <th></th>
                </tr>
              </thead>
              {listOfOrdersSet.map((order, index1) => {
                return (
                  <tbody key={index1}>
                    <tr >
                      <td colSpan={3} align="left" style={{ color: "black", backgroundColor: "wheat" }}>{order.created.substring(0, 16).replace("T", " ")}</td>
                    </tr>
                    {
                      order.orderedItems.map((orderItem, index) => {
                        actualPizzaName = pizzaTypesDataSet.find(pizza => pizza._id === orderItem.pizzaId)
                        if (actualPizzaName !== undefined) actualPizzaName = actualPizzaName.pizzaName;

                        grandTotalCost = grandTotalCost + orderItem.quantity * orderItem.pricePerEach;
                        return (
                          <tr key={index}>
                            <td>{actualPizzaName}</td>
                            <td>{orderItem.quantity} db</td>
                            <td>{orderItem.pricePerEach.toLocaleString('en-US')}.-Ft</td>
                            <td>
                              <td>
                                <button type="button" id="delete-btn" onClick={(e) => deleteOrderRow(order._id, orderItem._id)}>DEL </button>
                              </td>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody >
                )
              })}
              <tfoot>
                < tr>
                  <td colSpan={3} align="left">Total payable: {grandTotalCost.toLocaleString('en-US')}.-Ft</td>
                </tr >
              </tfoot>
            </table>
          </div >
        </div >
        :
        <div id="order-form">
          <h5>YOU DO NOT HAVE ACTIVE ORDER !!</h5>
          <h6>Please click on the wanted pizzacard <br />ADD TO BASKEN button!!</h6>
        </div>
      }
    </div >
  )
}

export default OrdersList