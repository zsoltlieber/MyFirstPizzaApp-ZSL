import {useContext } from 'react';
import { Context } from './../../context.js'

function PreOrderList() {


    const { pizzaIdToOrder, setListOfOrders, setShowPreOrderList, actualOrderItems, setActualOrderItems, setShowTopMessageBox, setShowOrderThanks } = useContext(Context);

    const ordersUrl = '/api/orders';


    if (actualOrderItems === null) {
        pizzaIdToOrder(undefined)
    }

    if (actualOrderItems.orderedItems !== undefined) {
        totalCost = actualOrderItems.orderedItems.reduce((accu, items) => accu + (items.pricePerEach * items.quantity), 0)
    }
    let totalCost = 0;
    const sendOrder = () => {
        if (actualOrderItems.orderedItems.length > 0) {
            const addOrderToOrderList = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualOrderItems)
                };
                const response = await fetch(ordersUrl, requestOptions);
                const data = await response.json();
                setListOfOrders(data);

                setShowTopMessageBox(false);
                setShowPreOrderList(false);
                setShowOrderThanks(true);
                setActualOrderItems([]);

                setTimeout(() => {
                    setShowOrderThanks(false);
                    setShowTopMessageBox(true);
                }, 3000);
            };
            addOrderToOrderList()
        }
    }

    const deleteOrderRow = (orderId) => {
        totalCost = actualOrderItems.orderedItems.reduce((accu, items) => accu + (items.pricePerEach * items.quantity), 0)
        const modifiedOrdersList = actualOrderItems.orderedItems.filter(orderItemId => orderItemId.pizzaId !== orderId)
        setActualOrderItems({ orderedItems: modifiedOrdersList });
    }


    return (
        <div>
            <div id="preorder-list">
                <h5 style={{ textAlign: "center", margin: "2% 0% 2% 0%" }}>PRE-Order list</h5>
                <table id="order-prelist-table" style={{ listStyleType: "none", fontSize: "15px" }}>
                    <thead>
                        <tr>
                            <th>Pizza name</th>
                            <th>Piece</th>
                            <th>Price each</th>
                        </tr>
                    </thead>
                    <tbody>

                        {actualOrderItems.orderedItems.map((order, index) => {
                            return (
                                <tr>
                                    <td key={index} style={{ textAlign: "left", marginLeft: "-3rem" }} className='order-element'>
                                        {order.pizzaName}
                                    </td>
                                    <td style={{ textAlign: "center" }} >{order.quantity}</td>
                                    <td>{order.pricePerEach.toLocaleString('en-US')}.- Ft</td>
                                    <td>
                                        <button type="button" id="delete-btn" onClick={(e) => deleteOrderRow(order.pizzaId)}>DEL </button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                    <tfoot>
                        < tr>
                            <td colSpan={3} align="left">Total cost: {totalCost.toLocaleString('en-US')}.-Ft</td>
                        </tr >
                    </tfoot>
                </table>
                <button style={{ width: "100%" }} type="button" className="btn" id="order-sender-btn" onClick={sendOrder}>
                    SEND ORDER
                </button>
            </div>
        </div>
    )
}

export default PreOrderList


