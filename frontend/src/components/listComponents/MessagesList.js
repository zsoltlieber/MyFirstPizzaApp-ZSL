import { useState, useEffect } from 'react';

export const MessagesList = ({ actualClientData, newMessageSet }) => {

    const messageUrl = "/api/messages"

    const [messages, setMessages] = useState([]);

    const messagesFetch = async (url) => {
        const response = await fetch(`${url}?isActive=true`);
        const data = await response.json();
        if (data) setMessages(data);
    };

    useEffect(() => {
        messagesFetch(messageUrl);
    }, []);

    useEffect(() => {
        setMessages(newMessageSet)
    }, [newMessageSet]);

    console.log(messages);

    const removeOrdeleteItem = (messageId) => {
        const actualEndPoint = messageUrl + "/" + messageId;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: false })
        };
        if (actualClientData.clientName !== "") {
            if (actualClientData.bossStatus !== true) {
                async function removeMessage() {
                    const response = await fetch(actualEndPoint, requestOptions);
                    if (response.status === 200) {
                        console.log('Remove successful');
                    } else {
                        console.log("Do not want to modify other's messages!")
                    }
                }
                removeMessage();
            } else {
                async function deleteMessage() {
                    await fetch(actualEndPoint, { method: 'DELETE' });
                    console.log('Delete successful');
                }
                deleteMessage();
            }
        }
    }
    const updateItem = (messageId) => {
        console.log("coming soon this update functionality ")
    }

    return (
        <div >
            <div className='message-box'>
                <h3 style={{ fontSize: "20px", color: "white", margin: "1px", textAlign: "center" }}>MESSAGES</h3>
                {messages ?
                    messages.map((item, index) => {
                        return (
                            <div key={index}>
                                <span className='message-item'>
                                    <div>
                                        <>
                                            <p style={{ marginBottom: "1px", textDecoration: "underline" }}>{item.clientName} :</p>
                                            {actualClientData.staffStatus === true
                                                ?
                                                <div>
                                                    <button id="delete-btn" type='delete' value={item._id} onClick={(e) => removeOrdeleteItem(e.target.value)}>DELETE</button>
                                                    <button id="update-btn" type='update' value={item._id} onClick={(e) => updateItem(e.target.value)}>UPDATE</button>
                                                </div>
                                                :
                                                <></>
                                            }
                                        </>
                                        <p style={{ marginTop: "0px" }}>{item.message}</p>
                                    </div>
                                </span>
                            </div>
                        )
                    })
                    : <></>}
            </div>

        </div>
    )
}

export default MessagesList