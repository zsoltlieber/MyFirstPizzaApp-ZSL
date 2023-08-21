import { useEffect, useState } from 'react';

export function OrderForm({ actualClientData, actualOrderedPizzaIdSet, allPizzaTypesData, listOfOrdersSet, setListOfOrdersData, currentFormSet, setCurrentForm }) {

    const registerUrl = '/api/orders'
    const [value, setValue] = useState();
    const [actualPizzaData, setActualPizzaData] = useState()
    const [actualOrderItems, setActualOrderItems] = useState([])
    const [showMessageBox, setShowMessageBox] = useState(false)
    if (actualOrderItems === null) actualOrderedPizzaIdSet = undefined;

    const saveOrder = () => {
        console.log(actualOrderItems.length > 0);
        if (actualOrderItems.length > 0) {
            const addOrderToOrderList = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "orderedItems": actualOrderItems })
                };
                const response = await fetch(registerUrl, requestOptions);
                const data = await response.json();
                setListOfOrdersData(data);
                setShowMessageBox(true);
            };
            addOrderToOrderList()
        }
    }
    const addActualOrderdItemToList = () => {
        console.log('log');
        console.log(actualPizzaData)
        const orderLine = {
            "pizzaId": actualPizzaData._id,
            "pizzaName": actualPizzaData.pizzaName,
            "pricePerEach": actualPizzaData.price,
            "quantity": value !== undefined ? parseInt(value) : 1
        }
        if (actualOrderItems.length === 0) {
            setActualOrderItems([orderLine]);
        } else {
            actualOrderItems.push(orderLine)
        }
        setActualPizzaData(undefined)
        setValue(1)
    }

    useEffect(() => {
        if (actualOrderedPizzaIdSet !== undefined) {
            const actualPizza = allPizzaTypesData.filter(pizza => pizza._id === actualOrderedPizzaIdSet);
            setActualPizzaData(actualPizza[0]);
        }
    }, [actualOrderedPizzaIdSet]);

    console.log("az" + actualOrderItems);
    console.log(actualOrderItems);

    return (
        <>
            {actualClientData.clientName !== ""
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
                            <div >
                                {actualOrderItems === undefined ?
                                    <>
                                        <h4>DEAR <br />{actualClientData.clientName}</h4>
                                        <h5>YOU DO NOT HAVE ACTIVE ORDER !!</h5>
                                    </>
                                    : <></>}
                                <h6>Please click on the wanted pizzacard <br />ADD TO BASKEN button!!</h6>
                                <button type="button" className="btn" id="ordersaver-btn" onClick={saveOrder}>
                                    SEND ORDER
                                </button>
                            </div>
                        }
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