import { useEffect, useContext, useState } from "react";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js"

const OrderListHandler = () => {

  const { actualClientData, allPizzaTypes, pizzaIdToOrder, itemIsActiveStatus } = useContext(MainContext);
  const { listOfOrders, setListOfOrders, preOrderList } = useContext(Context);

  const ordersUrl = `/api/orders`
  let totalCost = 0;
  let grandTotalCost = 0;
  let actualPizzaName = "";

  const [orderListWithName, setOrderListWithName] = useState([]);

  const orderFetch = async (url) => {
    const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
    const response = await fetch(actualUrl);
    const data = await response.json();
    if (data) {
      if (data.length !== 0) {
        data.map(order => fetchActualClientName(order));
      }
      setListOfOrders(data);
    }
  };

  useEffect(() => {
    orderFetch(ordersUrl);
  }, [preOrderList]);

  const deleteOrderFetch = (actualEndPoint, orderId) => {

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    async function deleteOrder() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newOrderList = listOfOrders.filter(order => order._id !== orderId);
        setListOfOrders(newOrderList)
        console.log('Order delete was successful');
      } else {
        console.log("Problem with order delete!")
      }
    }
    deleteOrder();
  };

  function removeOrderFetch(actualEndPoint, orderId, deletedItemId) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false })
    };
    async function removeOrder() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newOrderList = listOfOrders.filter(order => order._id !== orderId);
        setListOfOrders(newOrderList)
        console.log('Order remove was successful');
      } else {
        console.log("Do not want to modify other's order!")
      }
    }
    removeOrder();
  };

  const deleteOrderRow = (orderId) => {
    const actualEndPoint = ordersUrl + "/" + orderId;

    if (actualClientData.bossStatus === true) {
      deleteOrderFetch(actualEndPoint, orderId);
    }
    else if (actualClientData !== undefined && actualClientData.clientName !== "") {
      removeOrderFetch(actualEndPoint, orderId);
    }
  };

  const fetchActualClientName = async (actualOrder) => {
    const actualClientUrl = `/api/clients/${actualOrder.orderClientId}`
    while (actualOrder.clientName === undefined) {
      try {
        const response = await fetch(actualClientUrl);
        const data = await response.json();
        if (response.status === 200) {
          if (data.clientName !== undefined) {
            actualOrder.clientName = data.clientName;
          }
        }
      } catch (error) {
        console.log("Problem with client name!");
      }
    }
  }

  return (
    <>
      {listOfOrders !== undefined && listOfOrders.length > 0 && pizzaIdToOrder === "" && preOrderList.length < 1

        ?
        <div div id="order-list" >

          <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
          {listOfOrders.map((order, index1) => {

            return (
              <>
                {order.clientName !== undefined ? <p> {order.clientName} </p>  : <></>}
                <table key={index1} id="order-list-table" style={{ listStyleType: "none", fontSize: "15px", height: "10px" }}>
                  <thead >
                    <tr>
                      <th>Pizza name</th>
                      <th>Piece</th>
                      <th>Price each</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ alignItems: "center", color: "black", backgroundColor: "lightskyblue", height: "10px" }}>
                        {order.created.substring(0, 16).replace("T", " ")}
                      </td>
                      <td></td>
                      <td>
                        <button type="button" id="delete-btn" onClick={(e) => deleteOrderRow(order._id)}>DEL </button>
                      </td>
                    </tr>
                    {order.orderedItems.map((orderItem, index) => {
                      if (index === 0) totalCost = 0;
                      actualPizzaName = allPizzaTypes.find(pizza => pizza._id === orderItem.pizzaId)
                      if (actualPizzaName !== undefined) actualPizzaName = actualPizzaName.pizzaName;
                      totalCost = totalCost + orderItem.quantity * orderItem.pricePerEach;
                      grandTotalCost = grandTotalCost + orderItem.quantity * orderItem.pricePerEach;
                      return (
                        <tr key={index} style={{ alignItems: "left", height: "10px" }}>
                          <td>{actualPizzaName}</td>
                          <td>{orderItem.quantity} db</td>
                          <td>{orderItem.pricePerEach.toLocaleString('en-US')}.-Ft</td>
                        </tr>
                      )
                    }
                    )
                    }
                  </tbody >
                  <tfoot>
                    < tr>
                      <td colSpan={3} style={{ alignItems: "left", height: "10px" }}>Payable: {totalCost.toLocaleString('en-US')}.-Ft</td>
                    </tr >
                  </tfoot>
                </table>
              </>
            )
          })}
          <td colSpan={3} align="left">Total payable: {grandTotalCost.toLocaleString('en-US')}.-Ft</td>
        </div>
        : <></>
      }

    </ >
  )
}

export default OrderListHandler