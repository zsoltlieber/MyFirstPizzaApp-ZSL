import { useState, useEffect } from 'react';

export const MessagesList = () => {

    const messageUrl = "http://localhost:8080/api/messages"

    const [messages, setMessages] = useState([]);

    const messagesFetch = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        if (data) setMessages(data);
    };

    useEffect(() => {
        messagesFetch(messageUrl);
    }, [messages]);

    const deleteItem = (e) => {
        if (localStorage.getItem("userId_myapp") !== null) {
            if (localStorage.getItem("userId_myapp") !== null) {
                const actualEndPoint = messageUrl + "/" + e.target.id;
                console.log(actualEndPoint)
                /*
                async function removeOrDeleteMessage() {
                    await fetch(actualEndPoint, { method: 'DELETE' });
                    setMessages(null)
                    console.log('Delete successful');
                }
                removeOrDeleteMessage();
                */
            }
        }
    }

    const updateItem = (e) => {
        console.log(e.target.value);
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
                                            <p style={{ marginBottom:"1px", textDecoration: "underline" }}>{item.clientName} :</p>
                                            {localStorage.getItem("userId_myapp") !== null
                                                ?
                                                <div>
                                                    <button id="delete-btn" type='delete' value={item._id} onClick={deleteItem}>DELETE</button>
                                                    <button id="update-btn" type='update' value={item._id} onClick={updateItem}>UPDATE</button>
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