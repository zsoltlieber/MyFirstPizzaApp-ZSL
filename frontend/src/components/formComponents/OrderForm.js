import { useEffect, useState } from 'react';

export function OrderForm({ actualClientData, actualOrderedPizzaIdSet, allPizzaTypesData, listOfOrdersSet, setListOfOrdersData, currentFormSet, setCurrentForm }) {

    const registerUrl = '/api/orders'

    const [actualPizzaData, setActualPizzaData] = useState()
    const [actualOrderItems, setActualOrderItems] = useState([])
    const [showMessageBox, setShowMessageBox] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("--------------------------");
        console.log(actualOrderItems)
        console.log("--------------------------");
        if (actualOrderItems.length > 0) {
            console.log(actualOrderItems);
            const addOrderToOrderList = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualOrderItems)
                };
                const response = await fetch(registerUrl, requestOptions);
                const data = await response.json();
                setListOfOrdersData(data);
                setShowMessageBox(true);
                setTimeout(() => {
                    if (currentFormSet === "order-form") {
                        setCurrentForm("order-list");
                    }
                }, 3000);
            };
            addOrderToOrderList()
        }
    }
    const addActualOrderdItemToList = (actualOrderItem) => {
        console.log(actualOrderItem)
        /*
        const totalActualOrders = actualOrderItems.filter(item => item.pizzaId !== actualOrderItem.pizzaId).push(actualOrderItem)
        console.log(totalActualOrders);
        setActualOrderItems(totalActualOrders);
        console.log(actualOrderItems);
        */
    }

    const deleteItem = (deletedOrderItemId) => {
        console.log(deletedOrderItemId)
        const modifiedActualOrderItems = actualOrderItems.filter(item => item.pizzaId !== deletedOrderItemId)
        setActualOrderItems(modifiedActualOrderItems)
    }

    useEffect(() => {
        if (actualOrderedPizzaIdSet !== undefined) {
            const actualPizza = allPizzaTypesData.filter(pizza => pizza._id === actualOrderedPizzaIdSet);
            setActualPizzaData(actualPizza[0]);
        }
    }, [actualOrderedPizzaIdSet]);

    useEffect(() => {
        if (actualPizzaData !== undefined) {
            const orderLine = [{
                "pizzaId": actualPizzaData._id,
                "pizzaName": actualPizzaData.pizzaName,
                "price": actualPizzaData.price,
                "quantity": 1
            }]
            if (actualOrderItems !== undefined && actualOrderItems.length > 0) {
                console.log(actualOrderItems.length)
                console.log(orderLine);
                console.log("itt 0---------------------");
                console.log(actualOrderItems);
                const totalOrders = actualOrderItems.filter(item => item.pizzaId !== actualPizzaData._id)
                console.log(totalOrders);
                setActualOrderItems(totalOrders)
            } else {
                console.log("itt 1---------------------");
                setActualOrderItems(orderLine)
            }
        }
    }, [actualPizzaData]);

    console.log(actualOrderItems);

    return (
        <>
            {actualClientData.clientName !== ""
                ?
                <div id="order-form">
                    <form >
                        <h3 style={{ color: "white" }}>ORDER FORM</h3>
                        < ul style={{ listStyleType: "none" }}>
                            {actualOrderItems !== undefined && actualOrderItems.length > 0
                                ?
                                actualOrderItems.map((actualPizzaItemlistItemData, index) => {
                                    return (
                                        <li li key={index} style={{ marginLeft: "-3rem" }} className='orderElement'>

                                            {actualPizzaItemlistItemData.pizzaName} {actualPizzaItemlistItemData.price.toLocaleString('en-US')}.- Ft
                                            <input style={{ marginLeft: "10px" }} type="number" id="number" size="2" min={1} max={5} required />
                                            <button style={{ backgroundColor: "green", color: "white", marginLeft: "10px", width: "40px" }} type="add"
                                                value={{
                                                    pizzaId: actualPizzaItemlistItemData._id, price: actualPizzaItemlistItemData.price
                                                }} className="btn" onClick={(e) => addActualOrderdItemToList(e.target.value)}>
                                                ADD
                                            </button>
                                            <button style={{ backgroundColor: "red", color: "white", marginLeft: "10px", width: "40px" }} type="delete"
                                                value={actualPizzaItemlistItemData._id} className="btn" onClick={(e) => deleteItem(e.target.value)}>
                                                DEL
                                            </button>
                                            <div>
                                                <button button type="submit" id='submit' className="btn" onSubmit={(e) => handleSubmit(e)} > Send</button>
                                            </div>
                                        </li>
                                    )
                                })
                                :
                                <div id="message-box">
                                    <h4>DEAR <br />{actualClientData.clientName}</h4>
                                    <h5>YOU DO NOT HAVE ACTIVE ORDER !!</h5>
                                    <h5>Please click on the wanted pizzacard <br />ADD TO BASKEN button!!</h5>
                                </div>
                            }
                        </ul>
                    </form >
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
                    <div id="message-box">
                        <h4>DEAR <br />{actualClientData.clientName} thanks for your order!!</h4>
                        <h4>WE WELL DELIVER YOUR PIZZA SOON :) !!</h4>
                    </div>
                    : <></>
            }
        </>
    )
}

export default OrderForm;