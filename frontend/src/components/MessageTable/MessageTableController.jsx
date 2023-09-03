import { useEffect, useContext } from 'react';
import { Context } from "../../context.js"
import { MainContext } from "../../mainContext.js"
import MesssageTable from "../../components/MessageTable/MessageTable.jsx"

export const MessageTableController = () => {

    const { actualClientData, itemIsActiveStatus } = useContext(MainContext);
    const { messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage } = useContext(Context);

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

    const updateMessage = (messageId) => {
        const actualMessage = messageList.find(message => message._id === messageId);
        setNewOrModifiedMessage({ message: actualMessage.message, _id: messageId })
    };

    return (
        <>
            <MesssageTable deleteMessageHandler={deleteMessage} updateMessageHandler={updateMessage} />
        </ >
    )
}

export default MessageTableController