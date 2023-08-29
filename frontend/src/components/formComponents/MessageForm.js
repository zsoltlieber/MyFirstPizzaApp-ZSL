import { useEffect, useContext } from "react";
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

export const MessageForm = () => {
    const { actualClientData } = useContext(MainContext);
    const { messageList, updatableMessageId, setUpdatableMessageId, showMessageThanks,
        setShowMessageThanks, newMessage, setNewMessage } = useContext(Context);

    const messageUrl = "/api/messages"

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
                    setShowMessageThanks(true);
                    setTimeout(() => {
                        setShowMessageThanks(false);
                    }, 2000);
                }
                setNewMessage("");
                setUpdatableMessageId("");
            }
            loginToServer()
        }
        else {
            const updateOnServer = async () => {
                const updatableMessageUrl = messageUrl + "/" + updatableMessageId;

                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualMessage)
                };
                const response = await fetch(updatableMessageUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    setShowMessageThanks(true);
                    setTimeout(() => {
                        setShowMessageThanks(false);
                    }, 5000);
                }
                setNewMessage("");
                setUpdatableMessageId("");
            }
            updateOnServer()
        }
    }
    useEffect(() => {
        if (updatableMessageId !== "" && messageList !== undefined) {
            const actualMessage = messageList.find(message =>
                message._id === updatableMessageId).message;
            setNewMessage(actualMessage)
        }
    }, []);

    return (
        <div >
            <div>
                {actualClientData !== undefined && actualClientData.clientName !== ""
                    ?
                    <form id="message-form" onSubmit={handleSubmit}>
                        <p style={{ fontSize: "20px", margin: "0" }} >
                            {updatableMessageId === ""
                                ?
                                "NEW MESSAGE"
                                :
                                "Update message"}
                        </p>
                        <div>

                            <input type="message" id="message" placeholder="message"
                                name="inputbox" value={newMessage} required
                                onChange={(e) => setNewMessage(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" id="submit-btn" className="btn" >
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
                        <h1 id="message-form">We appreciate <br /> if you sent your opinion <br /> about our pizzas!</h1>
                    </div>
                    : <></>
            }
        </div >
    )
}

export default MessageForm