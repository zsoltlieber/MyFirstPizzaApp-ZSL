import { useEffect, useState } from 'react';

export function OrderForm({ actualClientData, actualOrderedPizzaIdSet, setActualPizzaIdEmpty, allPizzaTypesData, listOfOrdersSet, setListOfOrdersData }) {

    const ordersUrl = `/api/orders`
    const [value, setValue] = useState(1);
    const [actualPizzaData, setActualPizzaData] = useState()
    const [actualOrderItems, setActualOrderItems] = useState([])
    const [showTopMessageBox, setShowTopMessageBox] = useState(true)
    const [showMessageBox, setShowMessageBox] = useState(false)
    const [showOrderListData, setshowOrderListData] = useState(true)

    if (actualOrderItems === null) {
        actualOrderedPizzaIdSet = undefined
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
                setListOfOrdersData(data);

                setShowMessageBox(true);
                setshowOrderListData(false);

                setTimeout(() => {
                    setShowMessageBox(false)
                    setShowTopMessageBox(true)
                }, 1000);
            };
            addOrderToOrderList()
        }
    }
    const addActualOrderdItemToList = () => {
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
        setActualPizzaIdEmpty("")
        setActualPizzaData(undefined)
        setValue(1)
    }

    useEffect(() => {
        if (actualOrderedPizzaIdSet !== undefined) {
            const actualPizza = allPizzaTypesData.filter(pizza => pizza._id === actualOrderedPizzaIdSet);
            setActualPizzaData(actualPizza[0]);
        }
    }, [actualOrderedPizzaIdSet]);

    const deleteOrderRow = (orderId) => {
        const modifiedOrdersList = actualOrderItems.orderedItems.filter(orderItemId => orderItemId.pizzaId !== orderId)
        setActualOrderItems({ orderedItems: modifiedOrdersList });
    }

    return (
        <>
            {actualClientData.clientName !== ""
                ?
                <div id="order-container">
                    {showTopMessageBox
                        ?
                        <div id="order-form">
                            <form >
                                {actualOrderItems === undefined ?
                                    <h3 style={{ color: "white" }}>ORDER FORM</h3>
                                    : <></>}
                                {actualPizzaData !== undefined
                                    ?
                                    < ul style={{ listStyleType: "none" }}>
                                        <li style={{ marginLeft: "-3rem" }} className='orderElement'>
                                            {actualPizzaData.pizzaName} {actualPizzaData.price.toLocaleString('en-US')}.- Ft
                                            <input style={{ marginLeft: "10px" }} type="number" id="quantity" size="4" min={1}
                                                max={5} value={value !== undefined ? value : 1}
                                                onChange={(event) => setValue(event.target.value)}
                                            />
                                            <button type="button" className="btn" id="add-btn" onClick={addActualOrderdItemToList}>
                                                ADD
                                            </button>
                                        </li>
                                    </ul>
                                    :
                                    <>
                                        <div >
                                            {actualOrderItems !== undefined
                                                ? <></>
                                                : 
                                                <h5>YOU DO NOT HAVE ACT IVE ORDER !!</h5>
                                            }
                                            <h6>Please click on the wanted pizzacard <br />ADD TO BASKEN button!!</h6>
                                        </div>
                                        {showOrderListData && actualOrderItems.orderedItems && totalCost>0
                                            ?
                                            <div id="pre-order-list">
                                                <p>Order list</p>
                                                <table style={{ listStyleType: "none", fontSize: "15px" }}>
                                                    <tr>
                                                        <th>Pizza name</th>
                                                        <th>Quantity</th>
                                                        <th>Price each</th>
                                                    </tr>
                                                    {actualOrderItems.orderedItems.map((order, index) => {
                                                        return (
                                                            <tr>
                                                                <td key={index} style={{ marginLeft: "-3rem" }} className='orderElement'>
                                                                    {order.pizzaName}
                                                                </td>
                                                                <td>{order.quantity}</td>
                                                                <td>{order.pricePerEach.toLocaleString('en-US')}.- Ft</td>
                                                                <td>
                                                                    <button style={{ backgroundColor: "red", color: "white", marginLeft: "10px", width: "40px" }} type="button"
                                                                        id="delete-btn" className="btn" onClick={(e) => deleteOrderRow(order.pizzaId)}>
                                                                        DEL
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </table>
                                                <p style={{ backgroundColor: "yellow", color: "red", textAlign: "center" }}>
                                                    Total cost: {totalCost.toLocaleString('en-US')}.- Ft
                                                </p>
                                                <button type="button" className="btn" id="ordersender-btn" onClick={sendOrder}>
                                                    SEND ORDER
                                                </button>
                                            </div>
                                            : <></>}


                                    </>
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
                showMessageBox
                    ?
                    <div id="message-form">
                        <h4>DEAR <br />{actualClientData.clientName} thanks for your order!!</h4>
                        <h4>WE WELL DELIVER YOUR PIZZA SOON :) !!</h4>
                    </div>
                    : <></>
            }
        </>
    )
}

export default OrderForm;