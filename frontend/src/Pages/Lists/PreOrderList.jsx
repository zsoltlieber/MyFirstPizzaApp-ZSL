import { useContext } from 'react';
import { Context } from '../../context.js'
import { MainContext } from '../../mainContext.js'

function PreOrderList() {


    const { pizzaIdToOrder } = useContext(MainContext);
    const {  setListOfOrders, preOrderList, setPreOrderList, 
        setShowOrderThanks,  setShowTopMessageBox } = useContext(Context);

    const ordersUrl = '/api/orders';
    let totalCost = 0;

    if (preOrderList === null) {
        pizzaIdToOrder(undefined)
    }

    if (preOrderList.orderedItems !== undefined) {
        totalCost = preOrderList.orderedItems.reduce((accu, items) => accu + (items.pricePerEach * items.quantity), 0)
    }
   
    const sendOrder = () => {
        if (preOrderList.orderedItems.length > 0) {
            const addOrderToOrderList = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(preOrderList)
                };
                const response = await fetch(ordersUrl, requestOptions);
                const data = await response.json();
                setListOfOrders(data);
                setShowTopMessageBox(false);
                setShowOrderThanks(true);
                
                setTimeout(() => {
                    setPreOrderList([]);
                    setShowOrderThanks(false);
                    setShowTopMessageBox(true);
                }, 3000);
            };
            addOrderToOrderList()
        }
    }

    const deleteOrderRow = (orderId) => {
        totalCost = preOrderList.orderedItems.reduce((accu, items) => accu + (items.pricePerEach * items.quantity), 0)
        const modifiedOrdersList = preOrderList.orderedItems.filter(orderItemId => orderItemId.pizzaId !== orderId)
        setPreOrderList({ orderedItems: modifiedOrdersList });
    }

    return (
        <div>
            {preOrderList.orderedItems !== undefined && preOrderList.orderedItems.length > 0 
                ?
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

                            {preOrderList.orderedItems.map((order, index) => {
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
                : <></>
            }
        </div>
    )
}

export default PreOrderList


