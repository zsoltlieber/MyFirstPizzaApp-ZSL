import { createContext, useContext, useState, useEffect } from "react"
import { useItemIsActiveStatus } from '../contexts/ItemIsActiveStatusContextProvider';

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const [listOfOrders, setListOfOrders] = useState([]);  //total list of orders
    const [preOrderList, setPreOrderList] = useState([]);
    const [showOrderThanks, setShowOrderThanks] = useState(false);
    const [showOrderTopMessageBox, setShowOrderTopMessageBox] = useState(true);

    const ordersUrl = `/api/orders`

    const orderFetch = async (url) => {
        const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
        const response = await fetch(actualUrl);
        const data = await response.json();
        if (data) setListOfOrders(data);
    };

    useEffect(() => {
        orderFetch(ordersUrl);
    }, [preOrderList]);

    const deleteOrderFetch = (actualEndPoint, orderId) => {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        async function deleteOrder() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newOrderList = listOfOrders.filter(order => order._id !== orderId);
                setListOfOrders(newOrderList)
                console.log('Order delete was successful');
            } else {
                console.log("Problem with order delete!")
            }
        }
        deleteOrder();
    };

    function removeOrderFetch(actualEndPoint, orderId, deletedItemId) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: false })
        };
        async function removeOrder() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newOrderList = listOfOrders.filter(order => order._id !== orderId);
                setListOfOrders(newOrderList)
                console.log('Order remove was successful');
            } else {
                console.log("Do not want to modify other's order!")
            }
        }
        removeOrder();
    };

    const fetchActualClientName = async (actualOrder) => {
        const actualClientUrl = `/api/clients/${actualOrder.orderClientId}`
        while (actualOrder.clientName === undefined) {
            try {
                const response = await fetch(actualClientUrl);
                const data = await response.json();
                if (response.status === 200) {
                    console.log(data);
                    if (data.clientName !== undefined) {
                        actualOrder.clientName = data.clientName;
                    }
                }
            } catch (error) {
                console.log("Problem with client name!");
            }
        }
    }
    useEffect(() => {
        for (let i = 0; i < listOfOrders.length; i++) {
            console.log(listOfOrders[i]);
            fetchActualClientName(listOfOrders[i])
        }
    }, [])


    return (
        <OrderContext.Provider value={{
            listOfOrders, setListOfOrders,
            preOrderList, setPreOrderList,
            deleteOrderFetch, removeOrderFetch,
            showOrderThanks, setShowOrderThanks,
            showOrderTopMessageBox, setShowOrderTopMessageBox
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => {
    return useContext(OrderContext);
}

export default OrderContextProvider