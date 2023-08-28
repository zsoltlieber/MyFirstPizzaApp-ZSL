import { useEffect, useState, useContext } from 'react';
import { MainContext } from "../../mainContext.js";
import { Context } from './../../context.js'
import PreOrderList from '../listComponents/PreOrderList.js';

export function OrderForm() {

    const { actualClientData, pizzaIdToOrder, setPizzaIdToOrder, allPizzaTypes } = useContext(MainContext);
    const { setShowPreOrderList, showOrderThanks } = useContext(Context);

    const [value, setValue] = useState(1);
    const [actualPizzaData, setActualPizzaData, actualOrderItems, setActualOrderItems] = useState(undefined)

    const addActualOrderedItemToList = () => {
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

    return (
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
                                        <input style={{ width:"max-content", marginLeft: "10px" }} type="number" id="quantity" size="4" min={1}
                                            max={5} value={value !== undefined ? value : 1}
                                            onChange={(event) => setValue(event.target.value)}
                                        />
                                        <button type="button" className="btn" id="add-btn" onClick={addActualOrderedItemToList}>ADD</button>
                                    </li>
                                </ul>
                                <PreOrderList />
                            </>
                            : <></>
                        }
                    </form >
                </div >
                : <></>
            }

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