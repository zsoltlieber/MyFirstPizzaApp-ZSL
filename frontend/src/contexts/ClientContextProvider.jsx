import { createContext, useState, useEffect, useContext } from "react"
import { useItemIsActiveStatus } from "./ItemIsActiveStatusContextProvider"

export const ClientContext = createContext();

const ClientContextProvider = ({ children }) => {
    const emptyClient = {
        address: [{
            postCode: "",
            city: "",
            streetAndNumber: "",
            otherInfo: ""
        }],
    };
    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const [allClientData, setAllClientData] = useState([]);
    const [actualClientData, setActualClientData] = useState(emptyClient);
    const [newOrModifiedClient, setNewOrModifiedClient] = useState(emptyClient);
    const [updatableClientId, setUpdatableClientId] = useState("");

    const clientUrl = "/api/clients"

    const clientsFetch = async (url) => {
        const actualClientUrl = `${clientUrl}?isActive=${itemIsActiveStatus}`
        try {
            const response = await fetch(actualClientUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch clients.");
            }
            const data = await response.json();
            if (data) setAllClientData(data);
        } catch (error) {
            console.error("Error fetching clients:", error.message);
        }
    };

    useEffect(() => {
        clientsFetch(clientUrl);
    }, [newOrModifiedClient]);

    const updateClient = (clientId) => {
        setUpdatableClientId(clientId);
        const actualClient = allClientData.find(client => client._id === clientId);
        setNewOrModifiedClient(actualClient)
    };

    async function deleteClient(removableClientId) {
        if (actualClientData.bossStatus === true) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch(`${clientUrl}/${removableClientId}`, requestOptions);
                if (response.status === 200) {
                    const newClientList = allClientData.filter(client => client._id !== removableClientId);
                    setAllClientData(newClientList)
                    console.log('Client delete was successful');
                } else {
                    throw new Error("Failed to delete client.");
                }
            } catch (error) {
                console.error("Problem with client delete!", error.message)
            }
        } else {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isActive: false })
                };

                const response = await fetch(`${clientUrl}/${removableClientId}`, requestOptions);
                if (response.status === 200) {
                    const newClientList = allClientData.filter(client => client._id !== removableClientId);
                    setAllClientData(newClientList)
                    console.log('Client remove was successful');
                } else {
                    throw new Error("Failed to remove message.")
                }
            } catch (error) {
                console.log("Problem with client remove!", error.message)
            }
        }
    };

    return (
        <ClientContext.Provider value={{
            allClientData, setAllClientData, actualClientData, setActualClientData,
            newOrModifiedClient, setNewOrModifiedClient, updatableClientId, setUpdatableClientId,
            updateClient, deleteClient
        }}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClientContext = () => {
    return useContext(ClientContext)
}

export default ClientContextProvider
