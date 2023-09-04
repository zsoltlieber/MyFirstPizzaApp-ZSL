import { useState, useContext } from "react";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js";

export function RegistrationForm() {

    const { actualClientData, setRightColumnType } = useContext(MainContext);
    const { newOrModifiedClient, setNewOrModifiedClient,
        updatableClientId, setUpdatableClientId } = useContext(Context);

    const registerUrl = '/api/clients/register'

    const [showRegistrationMessage, setShowRegistrationMessage] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const actualClientData = {
            clientName: newOrModifiedClient.clientName,
            email: newOrModifiedClient.email,
            password: newOrModifiedClient.password,
            phoneNumber: [newOrModifiedClient.phoneNumber],
            address: [{
                postCode: newOrModifiedClient.address.postCode,
                city: newOrModifiedClient.address.city,
                streetAndNumber: newOrModifiedClient.address.streetAndNumber,
                otherInfo: newOrModifiedClient.address.otherInfo || ""
            }],
            isActive: newOrModifiedClient.isActive || false,
            isAdmin: newOrModifiedClient.isAdmin || false,
            isMainAdmin: newOrModifiedClient.isMainAdmin || false
        };

        if (newOrModifiedClient !== undefined) {
            const registrationSave = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualClientData)
                };
                const response = await fetch(registerUrl, requestOptions);
                const data = await response.json();
                setNewOrModifiedClient(data);
                setShowRegistrationMessage(true);
                setTimeout(() => {
                    setRightColumnType("login");
                    setShowRegistrationMessage(false);
                }, 2000);
            };
            registrationSave()
        }
    }

    function cancelButton() {
        setUpdatableClientId("");
        setNewOrModifiedClient({ clientName: "" })
    }

    return (
        <>
            {!showRegistrationMessage ?
                <div id="registration-form">
                    <form onSubmit={handleSubmit}>
                        <p style={{ fontSize: "20px", margin: "0" }} >
                            {updatableClientId === ""
                                ?
                                "NEW CLIENT REGISTRATION FORM"
                                :
                                "Update client form"}
                        </p>
                        <div>
                            <input type="text" id="client-name" placeholder="client name"
                                value={newOrModifiedClient.clientName || ""} required
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, clientName: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="password" id="password" placeholder="password"
                                value={newOrModifiedClient.password} required
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, password: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="email" id="email" placeholder="email"
                                value={newOrModifiedClient.email || ""} required
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, email: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="text" id="phone-number" placeholder="phoneNumber"
                                value={newOrModifiedClient.phoneNumber || ""} required
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, phoneNumber: e.target.value }) }} />
                        </div>
                        <div>
                            <input type="text" id="post-code" placeholder="postCode"
                                value={newOrModifiedClient.address[0].postCode || ""} required
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: { ...newOrModifiedClient.address, postCode: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="city" placeholder="city"
                                value={newOrModifiedClient.address[0].city || ""} required
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: { ...newOrModifiedClient.address, city: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="streat-and-number" placeholder="streatAndNumber"
                                value={newOrModifiedClient.address[0].streetAndNumber || ""} required
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: { ...newOrModifiedClient.address, streetAndNumber: e.target.value } }) }} />
                        </div>
                        <div>
                            <input type="text" id="other-info" placeholder="otherInfo"
                                value={newOrModifiedClient.address[0].otherInfo || ""}
                                onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: { ...newOrModifiedClient.address, otherInfo: e.target.value } }) }} />
                        </div>
                        {actualClientData.isAdmin === true
                            ?
                            <>
                                <div>Active?
                                    <input type="text" id="isActive" placeholder="isActive true/false" value={newOrModifiedClient.isActive || ""}
                                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, isActive: e.target.value }) }} />
                                </div>
                                <div>Admin?
                                    <input type="text" id="isAdmin" placeholder="isAdmin true/false" value={newOrModifiedClient.isAdmin || ""}
                                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, isAdmin: e.target.value }) }} />
                                </div>
                                <div>Boss ?
                                    <input type="text" id="isMainAdmin" placeholder="isMainAdmin true/false" value={newOrModifiedClient.isMainAdmin || ""}
                                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, isMainAdmin: e.target.value }) }} />
                                </div>
                            </>
                            : <></>}
                        <button type="submit" className="btn">
                            {updatableClientId === ""
                                ?
                                "SUBMIT"
                                :
                                "UPDATE"}
                        </button>
                        <button type="button" id="submit-btn" className="btn" onClick={cancelButton}>
                            Cancel
                        </button>
                    </form >
                </div>
                :
                <div id="registration-message">
                    <div>
                        <h4>DEAR <br />{newOrModifiedClient.clientName} we are very happy to see you!!</h4>
                        <h4>ORDER AND TASTE OUR PIZZAS :) !!</h4>
                    </div>
                </div>
            }
        </>
    )
}

export default RegistrationForm;