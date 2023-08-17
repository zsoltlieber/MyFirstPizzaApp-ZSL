import { useState } from 'react';

export const MessageForm = ({ actualClientData, setActualNewMessage }) => {

    const messageUrl = "/api/messages/"
    const [newMessages, setNewMessages] = useState("");
    const [showBox, setShowBox] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const actualClientName = actualClientData.clientName
        const actualMessage = { message: newMessages, clientName: actualClientName }
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
                setShowBox(true);
                setTimeout(() => {
                    setShowBox(false);
                    setNewMessages("");
                }, 2000);
            }
        }
        loginToServer()
    }
    function sendNewMessage() {
        console.log(newMessages);
    }

    return (
        <div >
            <div>
                {actualClientData.clientName !== ""
                    ?

                    <form id="message-form" onSubmit={handleSubmit}>
                        <p style={{ fontSize: "20px", color: "white", margin: "5px" }}>NEW MESSAGE</p>
                        <div>
                            <input type="message" id="message" placeholder="message" name="inputbox" value={newMessages} required
                                onChange={(e) => setNewMessages(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" className="btn" onClick={sendNewMessage}>Login</button>
                        </div>
                    </form>
                    : <h1 id="message-form" style={{ fontSize: "20px", color: "white" }}>ONLY REGISTERED CLIENT CAN SEND MESSAGE!</h1>}
            </div>


            {
                showBox ?
                    <div>
                        <h3 style={{ color: "white" }}>We appreciate if you send us about your feelings in connection with our pizzas!</h3>
                    </div>
                    : <></>
            }
        </div >
    )
}

export default MessageForm