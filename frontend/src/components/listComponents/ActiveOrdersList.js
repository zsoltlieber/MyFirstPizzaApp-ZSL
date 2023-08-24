import { useEffect } from "react";

const ActiveOrdersList = ({ actualClientDataSet, listOfOrdersSet, setOrdersList, pizzaTypesDataSet, showOrderListSet }) => {
  
  const ordersUrl = `/api/orders`
  let totalCost = 0;
  let grandTotalCost = 0;

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
      {listOfOrdersSet && listOfOrdersSet.length > 0 && actualClientDataSet.clientName !== "" && !showOrderListSet
        ?
        < div id="order-list" >
          <div style={{ color: "white" }}>
            <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
            <p style={{ backgroundColor: "blue" }}>{actualClientDataSet.clientId === listOfOrdersSet.orderClientId ? actualClientDataSet.clientName.toUpperCase() : actualClientDataSet.clientName}</p>

            <table id="order-list-table" style={{ listStyleType: "none", fontSize: "15px" }}>
              <tr>
                <th>Pizza name</th>
                <th>Piece</th>
                <th>Price each</th>
              </tr>
              {listOfOrdersSet.map((order, index1) => {
                return (
                  <>
                    <tr key={index1}>
                      <td colSpan={3} align="left" >{order.created.substring(0, 16).replace("T", " ")}</td>
                    </tr>

                    {
                      order.orderedItems.map((orderItem, index) => {
                        const actualPizzaName = pizzaTypesDataSet.find(pizza => pizza._id === orderItem.pizzaId).pizzaName
                        totalCost = 0;
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
                    < tr>
                      <td colSpan={3}align="left">Payable: {grandTotalCost.toLocaleString('en-US')}.-Ft</td>
                    </tr >
                  </>
                )
              })}
            </table>
          </div >
        </div >
        : <></>
      }
    </div >
  )
}

export default ActiveOrdersList