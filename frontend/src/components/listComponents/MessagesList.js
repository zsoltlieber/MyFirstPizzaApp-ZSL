import { useEffect, useContext } from 'react';
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

export const MessagesList = () => {

    const { actualClientData } = useContext(MainContext);
    const { messageList, setMessageList, setNewMessage, updatableMessageId, setUpdatableMessageId, showMessageThanks } = useContext(Context);

    let messageUrl = "/api/messages"

    const messagesFetch = async (url) => {
        const response = await fetch(`${url}?isActive=true`);
        const data = await response.json();
        if (data) setMessageList(data);
    };

    useEffect(() => {
        messagesFetch(messageUrl);
    }, [messageList]);

    function deleteMessageFetch(actualEndPoint, messageId) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        async function deleteMessage() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newMessageList = messageList.filter(message => message._id !== messageId);
                setMessageList(newMessageList)
                console.log('Delete successful');
            } else {
                console.log("Problem with message delete!")
            }
        }
        deleteMessage();
    };

    function removeMessageFetch(actualEndPoint, messageId) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: false })
        };
        async function removeMessage() {
            const response = await fetch(actualEndPoint, requestOptions);
            if (response.status === 200) {
                const newMessageList = messageList.filter(message => message._id !== messageId);
                setMessageList(newMessageList)
                console.log('Remove successful');
            } else {
                console.log("Do not want to modify other's messages!")
            }
        }
        removeMessage();
    };

    const deleteOrderRow = (messageId) => {
        const actualEndPoint = messageUrl + "/" + messageId;

        if (actualClientData.bossStatus === true) {
            deleteMessageFetch(actualEndPoint, messageId);
        }
        else if (actualClientData !== undefined && actualClientData.clientName !== "") {
            removeMessageFetch(actualEndPoint, messageId);
        }
    };

    const updateItem = (messageId) => {
        setUpdatableMessageId(messageId);
        const actualMessage = messageList.find(message => message._id === messageId);
        setNewMessage(actualMessage.message)
    };

    return (
        <>
            {messageList && messageList !== null && !updatableMessageId && messageList.length > 0 && !showMessageThanks
                ?
                < div id='message-list' >
                    <p style={{ textAlign: "center", fontSize: "20px", margin: "0" }} >MESSAGE LIST</p>

                    <table id="message-list-table">
                        <thead>
                            <tr>
                                <th>Client name</th>
                                <th>Message</th>
                                <th></th>
                            </tr>
                        </thead>
                        {messageList.map((message, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td><p>{message.clientName}</p></td>
                                        <td><p style={{ marginTop: "0px", maxWidth: "95%" }}>{message.message}</p></td>
                                        {actualClientData !== undefined && actualClientData.clientName !== ""
                                            ?
                                            <td >
                                                <button type="button" id="delete-btn" value={message._id} onClick={(e) => deleteOrderRow(e.target.value)}>DEL </button>
                                                <button type='button' id="update-btn" value={message._id} onClick={(e) => updateItem(e.target.value)}>UPD</button>
                                            </td>
                                            : <></>}
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table >
                </div>
                : <></>}
        </ >
    )
}


export default MessagesList