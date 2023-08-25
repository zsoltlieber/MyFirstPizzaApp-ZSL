import { useEffect } from "react";

const ActiveOrdersList = ({ actualClientDataSet, listOfOrdersSet, setOrdersList, pizzaTypesDataSet, showPreOrderListSet }) => {

  const ordersUrl = `/api/orders`
  let totalCost = 0;
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

  return (
    <div>
      {listOfOrdersSet && listOfOrdersSet.length > 0 && actualClientDataSet.clientName !== "" && !showPreOrderListSet
        ?
        < div id="order-list" >
          <div >
            <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
            <p style={{ backgroundColor: "blue" }}>{actualClientDataSet.clientId === listOfOrdersSet.orderClientId ? actualClientDataSet.clientName.toUpperCase() : actualClientDataSet.clientName}</p>

            <table id="order-list-table" style={{ listStyleType: "none", fontSize: "15px" }}>
              <thead>
                <tr>
                  <th>Pizza name</th>
                  <th>Piece</th>
                  <th>Price each</th>
                </tr>
              </thead>
              {listOfOrdersSet.map((order, index1) => {
                totalCost = 0;
                return (
                  <tbody key={index1}>
                    <tr >
                      <td colSpan={3} align="left" style={{ color: "black", backgroundColor: "wheat" }}>{order.created.substring(0, 16).replace("T", " ")}</td>
                    </tr>
                    {
                      order.orderedItems.map((orderItem, index) => {
                        actualPizzaName = pizzaTypesDataSet.find(pizza => pizza._id === orderItem.pizzaId)
                        if (actualPizzaName !== undefined) actualPizzaName = actualPizzaName.pizzaName;
                        totalCost = totalCost + orderItem.quantity * orderItem.pricePerEach;
                        grandTotalCost = grandTotalCost + totalCost
                        return (
                          <tr key={index}>
                            <td>{actualPizzaName}</td>
                            <td>{orderItem.quantity} db</td>
                            <td>{orderItem.pricePerEach.toLocaleString('en-US')}.-Ft</td>
                          </tr>
                        )
                      })
                    }
                    <tr >
                      <td colSpan={3} align="left">Order payable: {totalCost.toLocaleString('en-US')}.-Ft</td>
                    </tr>
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
        : <></>
      }
    </div >
  )
}

export default ActiveOrdersList