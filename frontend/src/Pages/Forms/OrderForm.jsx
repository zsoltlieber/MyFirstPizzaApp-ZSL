import { useEffect, useState, useContext } from 'react';
import { MainContext } from "../../mainContext.js";
import { Context } from '../../context.js'
import PreOrderList from '../../Pages/Lists/PreOrderList.jsx';

export function OrderForm() {

    const { actualClientData, pizzaIdToOrder, setPizzaIdToOrder, allPizzaTypes } = useContext(MainContext);
    const { listOfOrders, preOrderList, setPreOrderList, showOrderThanks, showTopMessageBox } = useContext(Context);

    const [value, setValue] = useState(1);
    const [actualPizzaData, setActualPizzaData] = useState(undefined)


    const addActualOrderedItemToList = () => {

        let amendedActualOrderList = []

        const orderLine = {
            "pizzaId": actualPizzaData._id,
            "pizzaName": actualPizzaData.pizzaName,
            "pricePerEach": actualPizzaData.price,
            "quantity": value !== undefined ? parseInt(value) : 1
        }

        if (preOrderList.orderedItems === undefined) {
            setPreOrderList({ orderedItems: [orderLine] });
        }
        else {
            if (preOrderList.orderedItems.find(item => item.pizzaId === orderLine.pizzaId) !== undefined) {
                amendedActualOrderList = preOrderList.orderedItems.filter(item => item.pizzaId !== orderLine.pizzaId);
                let modifyItem = preOrderList.orderedItems.find(item => item.pizzaId === orderLine.pizzaId);
                modifyItem.quantity = modifyItem.quantity + orderLine.quantity;
                amendedActualOrderList.push(modifyItem);
            }
            else {
                amendedActualOrderList = [...preOrderList.orderedItems, orderLine];
            }
            amendedActualOrderList = amendedActualOrderList.sort((a,b)=>a.pizzaName>b.pizzaName)
            setPreOrderList({ orderedItems: amendedActualOrderList })
        }
        setPizzaIdToOrder("")
        setValue(1)
    }

    useEffect(() => {
        if (pizzaIdToOrder !== undefined) {
            const actualPizza = allPizzaTypes.filter(pizza => pizza._id === pizzaIdToOrder);
            setActualPizzaData(actualPizza[0]);
        }
    }, [pizzaIdToOrder]);

    const deleteItemFromForm = () => {
        setPizzaIdToOrder("")
    }

    return (
        <div id="order-container">
            {showTopMessageBox && pizzaIdToOrder === ""
                ?
                <div id="order-top-message-box">
                    {listOfOrders.length < 1
                        ?
                        <p>YOU DO NOT HAVE <br />ACTIVE ORDER !!</p>
                        : <></>
                    }
                    <p>Please click on wanted pizzacard's <br />ADD TO BASKEN button!!</p>
                </div>
                : <></>}
            {pizzaIdToOrder !== ""
                ?
                <>
                    <div id="order-form">
                        <form >
                            <h4 style={{ textAlign: "center", margin: "2% 0% 2% 0%" }}>ORDER FORM</h4>
                            {actualPizzaData !== undefined
                                ?
                                <>
                                    < ul style={{ listStyleType: "none" }}>
                                        <li style={{ marginLeft: "-3rem" }} className='order-element'>
                                            {actualPizzaData.pizzaName} {actualPizzaData.price.toLocaleString('en-US')}.- Ft
                                            <input style={{ width: "max-content", marginLeft: "10px" }} type="number" id="quantity" size="4" min={1}
                                                max={5} value={value !== undefined ? value : 1}
                                                onChange={(event) => setValue(event.target.value)}
                                            />
                                            <button type="button" className="btn" id="add-btn" onClick={addActualOrderedItemToList}>ADD</button>
                                            <button type="button" className="btn" id="delete-btn" onClick={deleteItemFromForm}>X</button>
                                        </li>
                                    </ul>
                                </>
                                : <></>
                            }
                        </form >
                    </div >
                </>
                : <></>
            }
            <PreOrderList />

            {showOrderThanks
                ?
                <div id="order-form">
                    <h4>DEAR <br />{actualClientData.clientName} thanks for your order!!</h4>
                    <h4>WE WELL DELIVER YOUR PIZZA SOON :) !!</h4>
                </div>
                : <></>
            }
        </div>
    )
}

export default OrderForm;