import { useState } from "react";
import { useRightColumnType } from "../../contexts/RightColumnContextProvider";

export function RegistrationForm() {

    const rightColumnTypeHandler = useRightColumnType();

    const registerUrl = '/api/clients/register'

    const emptyClient = {
        clientName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: [{
            postCode: "",
            city: "",
            streetAndNumber: "",
            otherInfo: ""
        }],
    };

    const [clientData, setClientData] = useState(emptyClient);
    const [showRegistrationMessage, setShowRegistrationMessage] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        if (clientData !== undefined) {
            const registrationSave = async () => {
                console.log(clientData);
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientData)
                };
                const response = await fetch(registerUrl, requestOptions);
                const data = await response.json();
                setClientData(data);
                setShowRegistrationMessage(true);
                setTimeout(() => {
                    rightColumnTypeHandler.setRightColumnType("login");
                    setShowRegistrationMessage(false);
                }, 2000);
            };
            registrationSave()
        }
    }
    console.log(clientData);
    return (
        <>
            {!showRegistrationMessage ?
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
                                onChange={(e) => { setClientData((clientData) => ({ ...clientData, address: [{ ...clientData.address[0], postCode: e.target.value }] })) }} />
                        </div>
                        <div>
                            <input type="text" id="city" placeholder="city" required
                                onChange={(e) => { setClientData((clientData) => ({ ...clientData, address: [{ ...clientData.address[0], city: e.target.value }] })) }} />
                        </div>
                        <div>
                            <input type="text" id="streat-and-number" placeholder="streatAndNumber" required
                                onChange={(e) => { setClientData((clientData) => ({ ...clientData, address: [{ ...clientData.address[0], streetAndNumber: e.target.value }] })) }} />
                        </div>
                        <div>
                            <input type="text" id="other-info" placeholder="otherInfo" required
                                onChange={(e) => { setClientData((clientData) => ({ ...clientData, address: [{ ...clientData.address[0], otherInfo: e.target.value }] })) }} />
                        </div>
                        <div>
                            <button type="submit" className="btn">LOGIN</button>
                        </div>
                    </form>
                </div>
                :
                <div id="registration-message">
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