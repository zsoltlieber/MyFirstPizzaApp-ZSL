import { useState, useEffect } from 'react';

const OrderForm = () => {

    const [activeOrderItems, setActiveOrderItems] = useState({});

    const changeToRegister = (e) => {
        console.log("register")
    }

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        console.log(activeOrderItems);
        /*
        fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ clientData })
    
        })
          .then(res => res.json())
          .then(res => console.log(res));
          */

    }

    return (
        <>
            <div >
                <div id="order-form" style={{ color: "white" }}>
                    RENDELÉSEK
                    {activeOrderItems !== undefined && activeOrderItems !== null
                        ? activeOrderItems.map(order => (
                            <div key={order._id}>
                                <p>{order.orderClientId}</p>
                                <ul>
                                    {order.orderedItems !== undefined && order.orderedItems !== null
                                        ? order.orderedItems.map(orderItem => {
                                            return (
                                                <>
                                                    <li>{orderItem.pizzaId}</li>
                                                    <li>{orderItem.pricePerEach}</li>
                                                    <li>
                                                        <div>
                                                            <input type="password" id="password" placeholder="password" required
                                                                onChange={(e) => { setActiveOrderItems({ ...activeOrderItems, quantity: e.target.value }) }} />
                                                        </div>
                                                    </li>
                                                    <li></li>
                                                </>
                                            )
                                        })
                                        : <></>
                                    }
                                </ul>

                            </div>
                        ))
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default OrderForm