import { createContext, useState, useEffect, useContext } from "react"
import { useItemIsActiveStatus } from "./ItemIsActiveStatusContextProvider"

export const ClientContext = createContext();

const ClientContextProvider = ({ children }) => {

    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const [allClientData, setAllClientData] = useState([]);
    const [actualClientData, setActualClientData] = useState({});
    const [newOrModifiedClient, setNewOrModifiedClient] = useState({}); 
    const [updatableClientId, setUpdatableClientId] = useState("");

    const clientUrl = "/api/clients"
    
    const clientsFetch = async (url) => {
        const actualClientUrl = `${clientUrl}?isActive=${itemIsActiveStatus}`
        const response = await fetch(actualClientUrl);
        const data = await response.json();
        if (data) setAllClientData(data);
        /* empty array lehet, de undifined nem!!! */
    };

    useEffect(() => {
        clientsFetch(clientUrl);
    }, []);

    const saveOnServer = async () => {
        console.log(newOrModifiedClient);
        const registerClientUrl = clientUrl + "/register"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrModifiedClient)
        };
        const response = await fetch(registerClientUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
            console.log(data);
        }
        else {
            setNewOrModifiedClient({ clientName: "" });
            setUpdatableClientId("");
            console.log("New client was saved!")
        }
    }

    const updateOnServer = async () => {
        const updatableClientUrl = clientUrl + "/" + updatableClientId;
        console.log(newOrModifiedClient);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrModifiedClient)
        };
        const response = await fetch(updatableClientUrl, requestOptions);
        const data = await response.json();
        if (response.status !== 200) {
            console.log(data)
        }
        else {
            setNewOrModifiedClient({ clientName: "" });
            setUpdatableClientId("");
            console.log("Modified client was saved!")
        }
    }

    function deleteClientFetch(actualEndPoint, clientId) {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        async function deleteClient() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newClientList = allClientData.filter(client => client._id !== clientId);
                setAllClientData(newClientList)
                console.log('Client delete was successful');
            } else {
                console.log("Problem with client delete!")
            }
        }
        deleteClient();
    };

    function removeClientFetch(actualEndPoint, clientId) {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: false })
        };
        async function removeClient() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newClientList = allClientData.filter(client => client._id !== clientId);
                setAllClientData(newClientList)
                console.log('Client remove was successful');
            } else {
                console.log("Problem with client remove!")
            }
        }
        removeClient();
    };

    return (
        <ClientContext.Provider value={{
            actualClientData, setActualClientData,
            allClientData, setAllClientData,
            newOrModifiedClient, setNewOrModifiedClient,
            updatableClientId, setUpdatableClientId,
            saveOnServer, updateOnServer,
            removeClientFetch, deleteClientFetch
        }}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClientContext = () => {
    return useContext(ClientContext)
}

export default ClientContextProvider
