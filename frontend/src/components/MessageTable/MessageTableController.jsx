import { useEffect } from 'react';
import { useItemIsActiveStatus } from '../../contexts/ItemIsActiveStatusContextProvider.jsx';
import { useMessageContext } from '../../contexts/MessageContextProvider.jsx';
import { useClientContext } from "../../contexts/ClientContextProvider.jsx";
import MesssageTable from "../../components/MessageTable/MessageTable.jsx"

export const MessageTableController = () => {

    const { actualClientData } = useClientContext();
    const { itemIsActiveStatus } = useItemIsActiveStatus();
    const { messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage, setOriginalMessage } = useMessageContext();

    const messageUrl = "/api/messages"

    const messagesFetch = async (url) => {
        const actualUrl = `${url}?isActive=${itemIsActiveStatus}`

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

    const deleteMessage = (messageId) => {
        if (actualClientData.bossStatus === true) {
            deleteMessageFetch(messageId);
        }
        else if (actualClientData !== undefined) {
            removeMessageFetch(messageId);
        }
    };

    const updateMessage = (index, messageId) => {
        const actualMessage = messageList.find(message => message._id === messageId);
        actualMessage.message = `${(index + 1)}.) ${actualMessage.message}`;
        setOriginalMessage(actualMessage.message)
        setNewOrModifiedMessage({ message: actualMessage.message, _id: messageId })
    };

    return (
        <>
            <MesssageTable deleteMessageHandler={deleteMessage} updateMessageHandler={updateMessage} />
        </ >
    )
}

export default MessageTableController