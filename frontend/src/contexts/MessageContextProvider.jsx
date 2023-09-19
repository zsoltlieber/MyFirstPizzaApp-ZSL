import { createContext, useContext, useState, useEffect } from "react"
import { useItemIsActiveStatus } from "./ItemIsActiveStatusContextProvider"

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
    const { itemIsActiveStatus } = useItemIsActiveStatus();
    
    const [messageList, setMessageList] = useState([]);
    const [newOrModifiedMessage, setNewOrModifiedMessage] = useState([]);
    const [originalMessage, setOriginalMessage] = useState("");
    const [showMessageThanks, setShowMessageThanks] = useState(false);
    const [showTopMessageBox, setShowTopMessageBox] = useState(true);

    const messageUrl = "/api/messages"

    const messagesFetch = async (url) => {
        const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
        
        try {
            const response = await fetch(actualUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch message.");
            }
            const data = await response.json();
            setMessageList(data);
        } catch (error) {
            console.error("Error fetching messages:", error.message);
        }
    };
    
    useEffect(() => {
        messagesFetch(messageUrl);
    }, [itemIsActiveStatus]);

    
    async function deleteMessageFetch(removableMessageId) {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };

            const response = await fetch(`${messageUrl}/${removableMessageId}`, requestOptions);
            if (response.status === 200) {
                const newMessageList = messageList.filter(message => message._id !== removableMessageId);
                setMessageList(newMessageList)
                console.log('Message delete was successful.');
            } else {
                throw new Error("Failed to delete message.")
            }
        }
        catch (error) {
            console.error("Problem with message delete!", error.message)
        }
    };

    async function removeMessageFetch(removableMessageId) {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: false })
            };
            const response = await fetch(`${messageUrl}/${removableMessageId}`, requestOptions);
            if (response.status === 200) {
                const newMessageList = messageList.filter(message => message._id !== removableMessageId);
                setMessageList(newMessageList)
                console.log('Message remove was successful');
            }
        }
        catch (error) {
            console.log("Problem with message delete!")
        }
    };

    return (
        <MessageContext.Provider value={{
            messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage,
            originalMessage, setOriginalMessage, showMessageThanks, setShowMessageThanks,
            showTopMessageBox, setShowTopMessageBox,
     //       deleteMessageFetch, removeMessageFetch
        }}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext);

//export const useMessagesFetch = () => useContext(MessageContext).messagesFetch();
export const useDeleteMessageFetch = (removableMessageId) => useContext(MessageContext).deleteMessageFetch(removableMessageId);
export const useRemoveMessageFetch = (removableMessageId) => useContext(MessageContext).removeMessageFetch(removableMessageId);

export default MessageContextProvider