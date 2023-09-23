import { createContext, useContext, useState, useEffect } from "react"
import { useItemIsActiveStatus } from '../contexts/ItemIsActiveStatusContextProvider';
import { useClientContext } from "./ClientContextProvider";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const { actualClientData } = useClientContext();

    const [listOfOrders, setListOfOrders] = useState([]);
    const [preOrderList, setPreOrderList] = useState([]);
    const [showOrderThanks, setShowOrderThanks] = useState(false);

    const ordersUrl = `/api/orders`

    const fetchActualClientName = async (actualOrder) => {
        const actualClientUrl = `/api/clients/${actualOrder.orderClientId}`
        while (actualOrder.clientName === undefined) {
            try {
                const response = await fetch(actualClientUrl);
                const data = await response.json();
                if (response.status === 200) {
                    if (data.clientName) {
                        actualOrder.clientName = data.clientName;
                    }
                }
            } catch (error) {
                console.log("Problem with client name!");
            }
        }
    }

    const orderFetch = async (url) => {
        const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
        const response = await fetch(actualUrl);
        const data = await response.json();
        if (data && data.length > 0) {
            data.map(order => fetchActualClientName(order));
            setListOfOrders(data);
        }
    };

    useEffect(() => {
        orderFetch(ordersUrl);
    }, [preOrderList]);


    async function deleteOrder(removableOrderId) {
        if (actualClientData.bossStatus === true) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch(`${ordersUrl}/${removableOrderId}`, requestOptions);
                if (response.status === 200) {
                    const newOrderList = listOfOrders.filter(order => order._id !== removableOrderId);
                    setListOfOrders(newOrderList)
                    console.log('Order delete was successful');
                } else {
                    throw new Error("Failed to delete order.")
                }
            } catch (error) {
                console.log("Problem with order delete!", error.message)
            }
        } else {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isActive: false })
                };
                const response = await fetch(`${ordersUrl}/${removableOrderId}`, requestOptions);
                if (response.status === 200) {
                    const newOrderList = listOfOrders.filter(order => order._id !== removableOrderId);
                    setListOfOrders(newOrderList)
                    console.log('Order remove was successful');
                } else {
                    throw new Error("Failed to remove order.")
                }
            }
            catch (error) {
                console.log("Problem with order remove!", error.message)
            }
        }
    };

    return (
        <OrderContext.Provider value={{
            listOfOrders, setListOfOrders,
            preOrderList, setPreOrderList,
            showOrderThanks, setShowOrderThanks,
            deleteOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => {
    return useContext(OrderContext);
}

export default OrderContextProvider