import { useEffect, useContext } from "react";
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

export const MessageForm = () => {
    const { actualClientData } = useContext(MainContext);
    const { messageList, newOrModifiedMessage, setNewOrModifiedMessage,
        updatableMessageId, setUpdatableMessageId, showMessageThanks, setShowMessageThanks, } = useContext(Context);

    const messageUrl = "/api/messages"

    const handleSubmit = (event) => {
        event.preventDefault();
        const actualMessage = {
            clientName : actualClientData.clientName,
            message: newOrModifiedMessage
        }

        if (newOrModifiedMessage !== "" && updatableMessageId === "") {
            const saveOnServer = async () => {
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
                    if (actualClientData.isAdmin === false) {
                        setShowMessageThanks(true);
                        setTimeout(() => {
                            setShowMessageThanks(false);
                        }, 2000);
                    }
                    console.log("New message was saved!")
                }
            }
            saveOnServer()
        }
        else if (newOrModifiedMessage !== "" && updatableMessageId !== "") {
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
                    if (actualClientData.isAdmin === false) {
                        setShowMessageThanks(true);
                        setTimeout(() => {
                            setShowMessageThanks(false);
                        }, 5000);
                    }
                    console.log("Modified message was saved!")
                }
            }
            updateOnServer()
        }
        else console.log("Wrong message - no modification!")
        setNewOrModifiedMessage("");
        setUpdatableMessageId("");
    }

    useEffect(() => {
        if (updatableMessageId !== "" && messageList !== undefined) {
            const actualMessage = messageList.find(message =>
                message._id === updatableMessageId).message;
            setNewOrModifiedMessage(actualMessage)
        }
    }, []);

    function cancelButton() {
        setNewOrModifiedMessage("");
        setUpdatableMessageId("");
    }

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
                                name="inputbox" value={newOrModifiedMessage} required
                                onChange={(e) => setNewOrModifiedMessage(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" id="submit-btn" className="btn" >
                                {updatableMessageId === ""
                                    ?
                                    "Submit"
                                    :
                                    "Update"}
                            </button>
                            <button type="button" id="submit-btn" className="btn" onClick={cancelButton}>Cancel</button>
                        </div>
                    </form>
                    : <h3 id="message-form" >ONLY REGISTERED CLIENT<br /> CAN SEND MESSAGE!</h3>}
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