import { useState } from "react";

export function RegistrationForm({ currentFormSet, setCurrentForm }) {
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
                if (currentFormSet === "signin") {
                    setCurrentForm("login");
                }
            }, 3000);
        };

        registerOnServer()

    }

    return (
        <>
            <div id="registration-form">
                {!showGreetBox ?
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ color: "white" }}>REGISTRATION FORM</h3>
                        <div>
                            <input type="text" id="clientName" placeholder="client name" required
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
                            <input type="text" id="phoneNumber" placeholder="phoneNumber" required
                                onChange={(e) => { setClientData({ ...clientData, phoneNumber: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="text" id="postCode" placeholder="postCode" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, postCode: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="city" placeholder="city" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, city: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="streatAndNumber" placeholder="streatAndNumber" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, streatAndNumber: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="otherInfo" placeholder="otherInfo" required
                                onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, otherInfo: e.target.value } }) }} />
                        </div>
                        <div>
                            <button type="submit" className="btn">Login</button>
                        </div>
                    </form>
                    :
                    <div id="greeting">
                        <div style={{color:"white"}}>
                            <h4>DEAR <br />{clientData.clientName} we are very happy to see you!!</h4>
                            <h4>ORDER AND TASTE OUR PIZZAS :) !!</h4>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default RegistrationForm;