import { useState, useEffect } from 'react';

export const MessageForm = () => {

    const messageUrl = "http://localhost:8080/api/messages"

    const [newMessage, setNewMessage] = useState([]);
    const [showBox, setShowBox] = useState(false);

     const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newMessage)
        const loginToServer = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            };
            const response = await fetch(messageUrl, requestOptions);
            const data = await response.json();
            console.log(data)
            /*
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
              */
        };
        loginToServer()
    }


    return (
        <div >
            <form id="message-form" onSubmit={handleSubmit}>
                <p style={{ fontSize: "20px", color: "white" }}>NEW MESSAGE</p>
                <div>
                    <input type="message" id="message" placeholder="message" required
                        onClick={(e) => { setNewMessage(e.target.value) }} />
                </div>
                <div>
                    <button type="submit" className="btn">Login</button>
                </div>
            </form>

            {showBox ?
                <div>
                    <h3 style={{ color: "white" }}>We appreciate if you send us about your feelings in connection with our pizzas!</h3>
                </div>
                : <></>}
        </div>
    )
}

export default MessageForm