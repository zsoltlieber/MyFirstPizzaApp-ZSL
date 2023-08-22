import { useEffect, useState } from 'react';

export function OrderForm({ actualClientData, actualOrderedPizzaIdSet, setActualPizzaIdEmpty, allPizzaTypesData, setListOfOrdersData }) {

    const registerUrl = '/api/orders'
    const [value, setValue] = useState();
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
        console.log(actualOrderItems.orderedItems);
        totalCost = actualOrderItems.orderedItems.reduce((accu, items) => accu + (items.pricePerEach * items.quantity), 0)
    }

    const saveOrder = () => {
        const orderedItems = actualOrderItems
        if (actualOrderItems.length > 0) {
            const addOrderToOrderList = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderedItems })
                };
                const response = await fetch(registerUrl, requestOptions);
                const data = await response.json();
                setListOfOrdersData(data);
                setActualOrderItems([])
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
    //******************************************** 
    console.log(actualOrderItems.orderedItems);
    console.log(showOrderListData);
    //******************************************** 
    useEffect(() => {
        if (actualOrderedPizzaIdSet !== undefined) {
            const actualPizza = allPizzaTypesData.filter(pizza => pizza._id === actualOrderedPizzaIdSet);
            setActualPizzaData(actualPizza[0]);
        }
    }, [actualOrderedPizzaIdSet]);




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
                                            {actualOrderItems.orderedItems === undefined
                                                ?
                                                <>
                                                    <h4>DEAR <br />{actualClientData.clientName}</h4>
                                                    <h5>YOU DO NOT HAVE ACTIVE ORDER !!</h5>
                                                </>
                                                : <></>
                                            }
                                            <h6>Please click on the wanted pizzacard <br />ADD TO BASKEN button!!</h6>
                                        </div>
                                        {/******************************************** */}
                                        {showOrderListData && actualOrderItems.orderedItems
                                            ?
                                            <div id="order-list">
                                                <p style={{ textAlign: "left" }}>Order pre-list not compulsory!!</p>
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
                                                                <td>{order.pricePerEach.toLocaleString('en-US')}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </table>
                                                <p>
                                                    Total cost: {totalCost.toLocaleString('en-US')}.- Ft
                                                </p>
                                                <button type="button" className="btn" id="ordersaver-btn" onClick={saveOrder}>
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