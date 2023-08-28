import { useState, useEffect, useContext } from 'react';
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

export const MessageForm = () => {
    const { actualClientData } = useContext(MainContext);
    const { messageList, setMessageList, updatableMessageId, setUpdatableMessageId,
        showMessageThanks, setShowMessageThanks } = useContext(Context);

    const messageUrl = "/api/messages"
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const actualMessage = { message: newMessage, clientName: actualClientData.clientName }
        if (updatableMessageId === "") {

            const loginToServer = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualMessage)
                };
                const response = await fetch(messageUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    const amendedMessageList = [...messageList, data];
                    setMessageList(amendedMessageList)
                    setShowMessageThanks(true);
                    setTimeout(() => {
                        setShowMessageThanks(false);
                        setNewMessage("");
                    }, 2000);
                }
            }
            loginToServer()
        }
        else {
            const updateOnServer = async () => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualMessage)
                };
                const response = await fetch(messageUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    const amendedMessageList = messageList.filter(message => message._id !== updatableMessageId).push(data);
                    setMessageList(amendedMessageList)
                    setShowMessageThanks(true);
                    setTimeout(() => {
                        setShowMessageThanks(false);
                        setNewMessage("");
                    }, 2000);
                }
            }
            setUpdatableMessageId("")
            updateOnServer()
        }
    }
    useEffect(() => {
        if (updatableMessageId !== "" && messageList !== undefined) {
            setNewMessage(messageList.find(message => message._id === updatableMessageId).message)
        }
    }, []);

    return (
        <div >
            <div>
                {actualClientData !== undefined && actualClientData.clientName !== ""
                    ?
                    <form id="message-form" onSubmit={handleSubmit}>
                        <p style={{ fontSize: "20px", margin: "0" }} >NEW MESSAGE</p>
                        <div>
                            <input type="message" id="message" placeholder="message" name="inputbox" value={newMessage}
                                required onChange={(e) => setNewMessage(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" className="btn" >
                                {updatableMessageId === ""
                                    ?
                                    "Submit"
                                    :
                                    "Update"}
                            </button>
                        </div>
                    </form>
                    : <h1 id="message-form" >ONLY REGISTERED CLIENT<br /> CAN SEND MESSAGE!</h1>}
            </div>

            {
                showMessageThanks ?
                    <div>
                        <h3 id="message-form">We appreciate if you sent us about your feelings <br />in connection with our pizzas!</h3>
                    </div>
                    : <></>
            }
        </div >
    )
}

export default MessageForm