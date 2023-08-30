import { useState, useContext } from "react";
import { Context } from "../../context.js";

export function RegistrationForm() {

    const { setRightColumnType } = useContext(Context);

    const registerUrl = '/api/clients/register'

    const [clientData, setClientData] = useState({});
    const [showGreetBox, setShowGreetBox] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const registerOnServer = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientData)
            };
            const response = await fetch(registerUrl, requestOptions);
            const data = await response.json();

            setClientData(data);
            setShowGreetBox(true);
            setTimeout(() => {
                setRightColumnType("login");
                setShowGreetBox(false);
            }, 3000);
        };
        registerOnServer()
    }

    return (
        <>
            {!showGreetBox ?
                <div id="registration-form">
                    <form onSubmit={handleSubmit}>
                        <h2>REGISTRATION FORM</h2>
                        <div>
                            <input type="text" id="client-name" placeholder="client name" required
                                onChange={(e) => { setClientData({ ...clientData, clientName: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="password" id="password" placeholder="password" required
                                onChange={(e) => { setClientData({ ...clientData, password: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="email" id="email" placeholder="email" required
                                onChange={(e) => { setClientData({ ...clientData, email: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="text" id="phone-number" placeholder="phoneNumber" required
                                onChange={(e) => { setClientData({ ...clientData, phoneNumber: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="text" id="post-code" placeholder="postCode" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, postCode: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="city" placeholder="city" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, city: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="streat-and-number" placeholder="streatAndNumber" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, streatAndNumber: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="other-info" placeholder="otherInfo" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, otherInfo: e.target.value } }) }} />
                        </div>
                        <div>
                            <button type="submit" className="btn">LOGIN</button>
                        </div>
                    </form>
                </div>
                :
                <div id="message-form">
                    <div>
                        <h4>DEAR <br />{clientData.clientName} we are very happy to see you!!</h4>
                        <h4>ORDER AND TASTE OUR PIZZAS :) !!</h4>
                    </div>
                </div>
            }
        </>
    )
}

export default RegistrationForm;