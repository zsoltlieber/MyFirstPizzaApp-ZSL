import { useEffect, useState } from 'react';

export function OrderForm({ actualClientData, actualOrderedPizzaIdSet, allPizzaTypesData, listOfOrdersSet, setListOfOrdersData, currentFormSet, setCurrentForm }) {

    const registerUrl = '/api/orders'

    const [actualPizzaData, setActualPizzaData] = useState()
    const [actualOrder, setActualOrder] = useState([])
    const [showMessageBox, setShowMessageBox] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const addOrderToOrderList = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                //          body: JSON.stringify(actualOrder)
            };
            const response = await fetch(registerUrl, requestOptions);
            const data = await response.json();

            const updatedOrderList = listOfOrdersSet.push(data)
            setListOfOrdersData(updatedOrderList);
            setShowMessageBox(true);
            setTimeout(() => {
                if (currentFormSet === "order") {
                    setCurrentForm("about");
                }
            }, 3000);
        };
        addOrderToOrderList()
    }
    const addActualOrderdItemToList = (orderData) => {
        const addActualItem = 0;
        /*
          "orderClientId": "initial",
              "orderId": 3,
                  "orderedItems":
        */
    }

    useEffect(() => {
        console.log(allPizzaTypesData.find(pizza => pizza.pizzaId === actualOrderedPizzaIdSet))
        setActualPizzaData(allPizzaTypesData.find(pizza => pizza.pizzaId === actualOrderedPizzaIdSet))

    }, [actualOrderedPizzaIdSet])

    console.log(actualOrderedPizzaIdSet);

    return (
        <>
            {actualClientData.clientName !== ""
                ?
                <div id="message-form">
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ color: "white" }}>ORDER FORM</h3>
                        {actualPizzaData !== undefined
                            ?
                            <ul>
                                <li>Pizza name: {actualPizzaData.pizzaName} Price: {actualPizzaData.price}
                                    <label>Quantity:</label>
                                    <input type="number" id="number" value={1} required
                                        onChange={(e) => { addActualOrderdItemToList(actualPizzaData.pizzaId, actualPizzaData.price, e.target.value) }} />
                                </li>

                                <div>
                                    <button type="submit" className="btn">Login</button>
                                </div>
                            </ul>
                            : <></>}
                    </form>

                    {showMessageBox
                        ?
                        <div id="message-box">
                            <div style={{ color: "white" }}>
                                <h4>DEAR <br />{actualClientData.clientName} thanks for your order!!</h4>
                                <h4>WE WELL DELIVER YOUR PIZZA SOON :) !!</h4>
                            </div>
                        </div>
                        : <></>
                    }
                </div>
                : <h1 id="message-form" >
                    ONLY REGISTERED CLIENT CAN ORDER ANY PIZZAS!
                    <br /><br />
                    Please sign in!
                </h1>}
        </>
    )
}

export default OrderForm;