import { useState } from 'react';

export const MessageForm = ({ actualClientData, setCurrentForm }) => {

    const messageUrl = "/api/messages"
    const [newMessages, setNewMessages] = useState("");
    const [showBox, setShowBox] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const actualMessage = { message: newMessages, clientName: actualClientData.clientName }
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
                    setCurrentForm("order")
                }, 2000);
            }
        }
        loginToServer()
    }

    return (
        <div >
            <div>
                {actualClientData.clientName !== ""
                    ?
                    <form id="message-form" onSubmit={handleSubmit}>
                        <p id="message-form">{actualClientData.clientName} NEW MESSAGE</p>
                        <div>
                            <input type="message" id="message" placeholder="message" name="inputbox" value={newMessages} required
                                onChange={(e) => setNewMessages(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" className="btn" >Submit</button>
                        </div>
                    </form>
                    : <h1 id="message-form" >ONLY REGISTERED CLIENT CAN SEND MESSAGE!</h1>}
            </div>

            {
                showBox ?
                    <div>
                        <h3 id="message-form">We appreciate if you send us about your feelings <br/>in connection with our pizzas!</h3>
                    </div>
                    : <></>
            }
        </div >
    )
}

export default MessageForm