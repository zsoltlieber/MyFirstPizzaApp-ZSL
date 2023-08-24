import { useEffect } from "react";

const ActiveOrdersList = ({ actualClientDataSet, listOfOrdersSet, setOrdersList, pizzaTypesDataSet }) => {

  const ordersUrl = `/api/orders`

  const orderFetch = async (url) => {
    const response = await fetch(`${url}?isActive=true`);
    const data = await response.json();
    if (data) setOrdersList(data);
  };

  useEffect(() => {
    orderFetch(ordersUrl);
  }, []);

    console.log(pizzaTypesDataSet);
    console.log(listOfOrdersSet);


  return (
    <div>
      {listOfOrdersSet && listOfOrdersSet.length !== undefined && listOfOrdersSet.length >0 && actualClientDataSet.clientName !== ""
        ?
        < div id="order-list" >
          <div style={{ color: "white" }}>
            <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
            <p style={{ backgroundColor: "blue" }}>{actualClientDataSet.clientId === listOfOrdersSet.orderClientId ? actualClientDataSet.clientName.toUpperCase() : actualClientDataSet.clientName}</p>

            <table style={{ listStyleType: "none", fontSize: "15px" }}>
              <tr>
                <th>Pizza name</th>
                <th>Quantity</th>
                <th>Price each</th>
              </tr>
              {listOfOrdersSet.map((order, index1) => {
                return (
                  <div key={index1}>
                    <tr>
                      <td>{order.created.substring(0, 16).replace('T', '=')}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    {
                      order.orderedItems.map((orderItem, index) => {
                        return (
                          <div key={index}>
                            <tr>
                              <td>
                              </td>
                              <td>{pizzaTypesDataSet[0].pizzaName}{orderItem.pizzaId}{orderItem.quantity}</td>
                              <td>{orderItem.pricePerEach}</td>
                            </tr>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })}
            </table>
          </div >
        </div >
        : <></>
      }
    </div>
  )
}

export default ActiveOrdersList