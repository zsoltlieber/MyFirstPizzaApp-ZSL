import { useEffect, useContext } from "react";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js"

const OrderListHandler = () => {

  const { actualClientData, allPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder, itemIsActiveStatus  } = useContext(MainContext);
  const { listOfOrders, setListOfOrders,  setPreOrderList, showPreOrderList } = useContext(Context);

  const ordersUrl = `/api/orders`
  let grandTotalCost = 0;
  let actualPizzaName = "";

  const orderFetch = async (url) => {
    const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
    const response = await fetch(actualUrl);
    const data = await response.json();
    if (data) setListOfOrders(data);
  };

  useEffect(() => {
    orderFetch(ordersUrl);
  }, [pizzaIdToOrder]);

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

  function removeOrderFetch(actualEndPoint, orderId) {
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

  const updateItem = (orderId) => {
    setPizzaIdToOrder(orderId);
    const actualOrder = listOfOrders.find(order => order._id === orderId);
    setPreOrderList(actualOrder)
  };

  if (listOfOrders !== undefined && listOfOrders.length > 0) console.log(listOfOrders);
  
  return (
    <div>
      {listOfOrders!==undefined && listOfOrders.length > 0 && showPreOrderList
        ?
        < div id="order-list" >
          <div >
            <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
            <p style={{ backgroundColor: "blue", width: "fit-content" }}>
              {actualClientData.clientId === listOfOrders.orderClientId
                ? actualClientData.clientName.toUpperCase()
                : actualClientData.clientName}</p>

            <table id="order-list-table" style={{ listStyleType: "none", fontSize: "15px" }}>
              <thead>
                <tr>
                  <th>Pizza name</th>
                  <th>Piece</th>
                  <th>Price each</th>
                  <th></th>
                </tr>
              </thead>
              {listOfOrders.map((order, index1) => {
                return (
                  <tbody key={index1}>
                    <tr >
                      <td colSpan={3} align="left" style={{ color: "black", backgroundColor: "wheat" }}>{order.created.substring(0, 16).replace("T", " ")}</td>
                    </tr>
                    {
                      order.orderedItems.map((orderItem, index) => {
                        actualPizzaName = allPizzaTypes.find(pizza => pizza._id === orderItem.pizzaId)
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
                                <button type='button' id="update-btn" value={order._id} onClick={(e) => updateItem(e.target.value)}>UPD</button>
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
        <>
          {pizzaIdToOrder === "" && listOfOrders.length < 1
            ?
            <div id="order-form">
              <>
                <h5>YOU DO NOT HAVE <br />ACTIVE ORDER !!</h5>
                <h6>Please click on the wanted pizzacard <br />ADD TO BASKEN button!!</h6>
              </>
            </div>
            : <></>}
        </>
      }
    </div >
  )
}

export default OrderListHandler