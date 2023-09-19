import { createContext, useContext, useState, useEffect } from "react"
import useItemIsActiveStatus from "./ItemIsActiveStatusContextProvider"
    
export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {

    const itemIsActiveStatusHandler = useItemIsActiveStatus();
    const [messageList, setMessageList] = useState([]);
    const [newOrModifiedMessage, setNewOrModifiedMessage] = useState([]);
    const [originalMessage, setOriginalMessage] = useState("");
    const [showMessageThanks, setShowMessageThanks] = useState(false);
    const [showTopMessageBox, setShowTopMessageBox] = useState(true);

    const messageUrl = "/api/messages"

    const messagesFetch = async (url) => {
        const actualUrl = `${url}?isActive=${itemIsActiveStatusHandler.itemIsActiveStatus}`

        try {
            const response = await fetch(actualUrl);
            const data = await response.json();
            if (data) setMessageList(data);
        } catch (error) {
            console.log("Problem with message list!");
        }
    };

    useEffect(() => {
        messagesFetch(messageUrl);
    }, [newOrModifiedMessage]);

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
            }
        }
        catch (error) {
            console.log("Problem with message delete!")
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
            deleteMessageFetch, removeMessageFetch
        }}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => {
    return useContext(MessageContext);
}

export default MessageContextProvider