import { useMessageContext } from "../../contexts/MessageContextProvider.jsx";
import { useClientContext } from "../../contexts/ClientContextProvider.jsx";

export const MessageForm = () => {

    const { actualClientData } = useClientContext();
    const { messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage,
        originalMessage, setOriginalMessage, showMessageThanks, setShowMessageThanks } = useMessageContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        const messageUrl = "/api/messages"
        const actualMessage = {
            clientName: actualClientData.clientName,
            message: originalMessage !== ""
                ?
                originalMessage + " -> \n" + newOrModifiedMessage.message
                :
                newOrModifiedMessage.message
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
                    setNewOrModifiedMessage({ message: "" });
                    setOriginalMessage("")
                    console.log("New message was saved!")
                }
            }
            saveOnServer()
        }
        else if (newOrModifiedMessage._id && newOrModifiedMessage !== "") {

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
                }
                const newMessageList = messageList.filter(message => message._id !== newOrModifiedMessage._id)
                setMessageList([...newMessageList, data]);
                setNewOrModifiedMessage({ message: "" });
                console.log("Modified message was saved!")
            }
            updateOnServer()
        }
        else console.log("Wrong message - no modification!")

    }

    function cancelButton() {
        setNewOrModifiedMessage({ message: "" });
        setOriginalMessage("")
    }

    return (
        <>
            {actualClientData.clientName && actualClientData.clientName !== ""
                ?
                <form id="message-form" onSubmit={handleSubmit} >
                    {originalMessage && originalMessage !== ""
                        ?
                        <p style={{ fontSize: "20px", marginTop: "0" }} > {originalMessage}</p>
                        : null
                    }
                    <p style={{ fontSize: "20px", marginTop: "0" }} >
                        {newOrModifiedMessage === undefined || newOrModifiedMessage._id === undefined
                            ?
                            "NEW MESSAGE"
                            :
                            "UPDATE MESSAGE"}
                    </p>
                    <div>
                        <input type="text" id="message" placeholder="message"
                            name="inputbox" value={
                                newOrModifiedMessage._id === undefined
                                    ?
                                    newOrModifiedMessage.message
                                    :
                                    ""
                            } required
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
                        <button type="text" className="btn" onClick={cancelButton}>Cancel</button>
                    </div>
                </form>
                : <h3 id="message-form" >ONLY REGISTERED CLIENT<br /> CAN SEND MESSAGE!</h3>}


            {
                showMessageThanks ?
                    <div>
                        <h1 id="message-form">We appreciate <br /> if you sent your opinion <br /> about our pizzas!</h1>
                    </div>
                    : null
            }
        </>
    )
}

export default MessageForm