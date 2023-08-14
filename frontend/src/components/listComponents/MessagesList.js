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


    return (
        <div >
            <div className='message-box'>
                <h3>MESSAGES</h3>
                {messages ?
                    messages.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.clientName} : {item.message}</p>
                            </div>
                        )
                    })
                    : <></>}
            </div>

        </div>
    )
}

export default MessagesList