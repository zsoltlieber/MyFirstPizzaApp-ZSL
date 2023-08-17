import { useState } from 'react';

export const MessageForm = ({ actualClientData, setActualNewMessage }) => {

    const messageUrl = "/api/messages/"

    const [showBox, setShowBox] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const actualClientName = actualClientData.clientName
        const actualMessage = { message: setActualNewMessage, clientName: actualClientName }
        const loginToServer = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actualMessage)
            };
            console.log(requestOptions.body)
            const response = await fetch(messageUrl, requestOptions);
            const data = await response.json();
            if (response.status !== 200) {
                console.log(data)
            }
            else {
                console.log(data)
                setShowBox(true);
                setTimeout(() => {
                    setShowBox(false);
                }, 2000);
            }
        }
        loginToServer()
    }
    const addNewMessage = (e) => {
        setActualNewMessage(e.target.value)
    }


    return (
        <div >
            <div>
                {actualClientData.clientName !== ""
                    ?
                    <form id="message-form" onSubmit={handleSubmit}>
                        <p style={{ fontSize: "20px", color: "white", margin: "5px" }}>
                            Dear {actualClientData.clientName} your new message:</p>
                        <div>
                            <input type="message" id="message" placeholder="message"  required
                                onChange={addNewMessage} />
                        </div>
                        <div>
                            <button type="submit" className="btn">Login</button>
                        </div>
                    </form>
                    : <h1 id="message-form" style={{ fontSize: "20px", color: "white" }}>ONLY REGISTERED CLIENT CAN SEND MESSAGE!</h1>}
            </div>


            {showBox ?
                <div>
                    <h3 style={{ color: "white" }}>We appreciate if you send us about your feelings in connection with our pizzas!</h3>
                </div>
                : <></>}
        </div>
    )
}

export default MessageForm