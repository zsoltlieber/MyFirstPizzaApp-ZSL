import { useOrderContext } from '../../contexts/OrderContextProvider.jsx';
import { usePizzaTypeContext } from "../../contexts/PizzaTypeContextProvider.jsx";

const OrderListHandler = () => {
  const { allPizzaTypes } = usePizzaTypeContext();
  const { listOfOrders, deleteOrder } = useOrderContext();

  let totalCost = 0;
  let grandTotalCost = 0;
  let actualPizzaName = "";

  return (
    <>
      {listOfOrders.length > 0
        ?
        <div div id="order-list" >
          <h2 style={{ textDecoration: "underline" }}>Current active orders list</h2>
          {listOfOrders.map((order) => {
            return (
              <>
                <p> {order.clientName} </p>
                <table key={order._id} id="order-list-table" style={{ listStyleType: "none", fontSize: "15px", height: "10px" }}>
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
                        <button type="text" id="delete-btn" onClick={(e) => deleteOrder(order._id)}>DEL </button>
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
                    })}
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
        : null
      }
    </ >
  )
}

export default OrderListHandler