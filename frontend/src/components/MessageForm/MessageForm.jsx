import { useContext } from "react";
import { Context } from "../../context.js";
import { MainContext } from "../../mainContext.js";

export const MessageForm = () => {

    const { actualClientData } = useContext(MainContext);
    const { messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage,
        showMessageThanks, setShowMessageThanks } = useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();

        const messageUrl = "/api/messages"

        const actualMessage = {
            clientName: actualClientData.clientName,
            message: newOrModifiedMessage.message
        }

        if (newOrModifiedMessage !== "" && newOrModifiedMessage._id === undefined) {

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
                    setMessageList([...messageList, data]);
                    setNewOrModifiedMessage("");
                    console.log("New message was saved!")
                }
            }
            saveOnServer()
        }
        else if (newOrModifiedMessage !== "" && newOrModifiedMessage._id !== undefined) {

            const updateOnServer = async () => {
                const updatableMessageUrl = messageUrl + "/" + newOrModifiedMessage._id;

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
                    const newMessageList = messageList.filter(message => message._id !== newOrModifiedMessage._id)
                    console.log(newMessageList);
                    console.log(newOrModifiedMessage._id);
                    setMessageList([...newMessageList, data]);
                    setNewOrModifiedMessage("");
                    console.log("Modified message was saved!")
                }
            }
            updateOnServer()
        }
        else console.log("Wrong message - no modification!")

    }

    function cancelButton() {
        setNewOrModifiedMessage({});
    }

    return (
        <>
            {actualClientData.clientName !== undefined && actualClientData.clientName !== ""
                ?
                <form id="message-form" onSubmit={handleSubmit} >
                    <p style={{ fontSize: "20px", marginTop: "0" }} >
                        {newOrModifiedMessage === undefined || newOrModifiedMessage._id === undefined
                            ?
                            "NEW MESSAGE"
                            :
                            "UPDATE MESSAGE"}
                    </p>
                    <div>
                        <input type="text" id="message" placeholder="message"
                            name="inputbox" value={newOrModifiedMessage.message || ""} required
                            onChange={(e) => setNewOrModifiedMessage({ message: e.target.value })} />
                    </div>
                    <div>
                        <button type="submit" id="submit-btn" className="btn" >
                            {newOrModifiedMessage === undefined || newOrModifiedMessage._id === undefined
                                ?
                                "Submit"
                                :
                                "Update"}
                        </button>
                        <button type="button" id="submit-btn" className="btn" onClick={cancelButton}>Cancel</button>
                    </div>
                </form>
                : <h3 id="message-form" >ONLY REGISTERED CLIENT<br /> CAN SEND MESSAGE!</h3>}


            {
                showMessageThanks ?
                    <div>
                        <h1 id="message-form">We appreciate <br /> if you sent your opinion <br /> about our pizzas!</h1>
                    </div>
                    : <></>
            }

        </>
    )
}

export default MessageForm