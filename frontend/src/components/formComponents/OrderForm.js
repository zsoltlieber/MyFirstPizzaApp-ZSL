import { useEffect, useState, useContext } from 'react';
import { MainContext } from "../../mainContext.js";
import { Context } from './../../context.js'

export function OrderForm() {

    const { actualClientData, pizzaIdToOrder, setPizzaIdToOrder, allPizzaTypes } = useContext(MainContext);
    const { setListOfOrders, setShowPreOrderList } = useContext(Context);

    const ordersUrl = `/api/orders`
    const [value, setValue] = useState(1);
    const [actualPizzaData, setActualPizzaData] = useState(undefined)
    const [actualOrderItems, setActualOrderItems] = useState([])
    const [showTopMessageBox, setShowTopMessageBox] = useState(true)
    const [showThanksMessageBox, setShowThanksMessageBox] = useState(false)

    console.log(actualClientData);

    if (actualOrderItems === null) {
        pizzaIdToOrder(undefined)
    }

    let totalCost = 0;
    if (actualOrderItems.orderedItems !== undefined) {
        totalCost = actualOrderItems.orderedItems.reduce((accu, items) => accu + (items.pricePerEach * items.quantity), 0)
    }

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
                setShowThanksMessageBox(true);
                setActualOrderItems([]);

                setTimeout(() => {
                    setShowThanksMessageBox(false);
                    setShowTopMessageBox(true);
                }, 3000);
            };
            addOrderToOrderList()
        }
    }
    const addActualOrderdItemToList = () => {
        setShowPreOrderList(true)
        const orderLine = {
            "pizzaId": actualPizzaData._id,
            "pizzaName": actualPizzaData.pizzaName,
            "pricePerEach": actualPizzaData.price,
            "quantity": value !== undefined ? parseInt(value) : 1
        }
        if (actualOrderItems.length === 0) {
            setActualOrderItems({ orderedItems: [orderLine] });
        } else {

            const amendedActualOrderList = [...actualOrderItems.orderedItems, orderLine]
            setActualOrderItems({ orderedItems: amendedActualOrderList });
        }
        setPizzaIdToOrder("")
        setActualPizzaData(undefined)
        setValue(1)
    }

    useEffect(() => {
        if (pizzaIdToOrder !== undefined) {
            const actualPizza = allPizzaTypes.filter(pizza => pizza._id === pizzaIdToOrder);
            setActualPizzaData(actualPizza[0]);
        }
    }, [pizzaIdToOrder]);

    const deleteOrderRow = (orderId) => {
        totalCost = actualOrderItems.orderedItems.reduce((accu, items) => accu + (items.pricePerEach * items.quantity), 0)
        const modifiedOrdersList = actualOrderItems.orderedItems.filter(orderItemId => orderItemId.pizzaId !== orderId)
        setActualOrderItems({ orderedItems: modifiedOrdersList });
    }

    return (
        <>
            {actualClientData.clientName !== ""
                ?
                <div id="order-container">
                    {pizzaIdToOrder !== ""
                        ?
                        <div id="order-form">
                            <form >
                                <h4 style={{ textAlign: "center", margin: "2% 0% 2% 0%" }}>ORDER FORM</h4>
                                {actualPizzaData !== undefined
                                    ?
                                    <>
                                        < ul style={{ listStyleType: "none" }}>
                                            <li style={{ marginLeft: "-3rem" }} className='order-element'>
                                                {actualPizzaData.pizzaName} {actualPizzaData.price.toLocaleString('en-US')}.- Ft
                                                <input style={{ marginLeft: "10px" }} type="number" id="quantity" size="4" min={1}
                                                    max={5} value={value !== undefined ? value : 1}
                                                    onChange={(event) => setValue(event.target.value)}
                                                />
                                                <button type="button" className="btn" id="add-btn" onClick={
                                                    addActualOrderdItemToList
                                                }
                                                >
                                                    ADD
                                                </button>
                                            </li>
                                        </ul>
                                        <div>
                                            {actualOrderItems.orderedItems !== undefined && totalCost > 0
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
                                                : <></>}
                                        </div>
                                    </>
                                    : <></>

                                }
                            </form >
                        </div >
                        : <></>
                    }
                </div >
                :
                <h1 id="message-form" >
                    ONLY REGISTERED CLIENT CAN ORDER ANY PIZZAS!
                    <br /><br />
                    Please sign in!
                </h1>
            }
            {
                showThanksMessageBox
                    ?
                    <div id="order-form">
                        <h4>DEAR <br />{actualClientData.clientName} thanks for your order!!</h4>
                        <h4>WE WELL DELIVER YOUR PIZZA SOON :) !!</h4>
                    </div>
                    : <></>
            }
        </>
    )
}

export default OrderForm;