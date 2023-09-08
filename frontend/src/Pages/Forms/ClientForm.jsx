import { useContext } from "react";
import { Context } from "../../context.js"

function ClientForm() {

    const { newOrModifiedClient, setNewOrModifiedClient,
        updatableClientId, setUpdatableClientId } = useContext(Context);

    const clientUrl = "/api/clients"

    const handleSubmit = (event) => {
        event.preventDefault();
        const actualClient = {
            "clientName": newOrModifiedClient.clientName,  // TODO nem írja át a nevét minden mást igen!!!
            "email": newOrModifiedClient.email,
            "password": newOrModifiedClient.password,
            "phoneNumber": newOrModifiedClient.phoneNumber,
            "address": [{
                "postCode": newOrModifiedClient.postCode,
                "city": newOrModifiedClient.city,
                "streetAndNumber": newOrModifiedClient.streetAndNumber,
                "otherInfo": newOrModifiedClient.otherInfo || ""
            }],
            "isActive": newOrModifiedClient.isActive || false,
            "isAdmin": newOrModifiedClient.isAdmin || false,
            "isMainAdmin": newOrModifiedClient.isMainAdmin || false
        }
        setNewOrModifiedClient(actualClient)

        if (newOrModifiedClient.clientName !== ""
            && updatableClientId === "") {
            const saveOnServer = async () => {
                const registerClientUrl = clientUrl + "/register"
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newOrModifiedClient)
                };
                const response = await fetch(registerClientUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data);
                }
                else {
                    setNewOrModifiedClient({ clientName: "" });
                    setUpdatableClientId("");
                    console.log("New client was saved!")
                }
            }
            saveOnServer()
        }
        else if (newOrModifiedClient.clientName !== "" && updatableClientId !== "") {

            const updateOnServer = async () => {
                const updatableClientUrl = clientUrl + "/" + updatableClientId;
                console.log(newOrModifiedClient);
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newOrModifiedClient)
                };
                const response = await fetch(updatableClientUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    setNewOrModifiedClient({ clientName: "" });
                    setUpdatableClientId("");
                    console.log(data);
                    console.log("Modified client was saved!")
                }
            }
            updateOnServer()
        }
        else { console.log("Wrong data - no modification!") }
    }

    function cancelButton() {
        setUpdatableClientId("");
        setNewOrModifiedClient({ clientName: "" })
    }

    if (newOrModifiedClient === undefined)
        setNewOrModifiedClient({
            clientName: "",
            email: "",
            password: "",
            phoneNumber: [""],
            address: [{
                postCode: "",
                city: "",
                streetAndNumber: "",
                otherInfo: ""
            }],
        });

    return (
        <div id="client-form">
            <form onSubmit={handleSubmit}>
                <p style={{ fontSize: "20px", margin: "0" }} >
                    {updatableClientId === ""
                        ?
                        "NEW CLIENT FORM"
                        :
                        "Update client"}
                </p>
                <div>
                    <div>
                        <label>Name: </label>
                        <input type="text" id="clientName" placeholder="client name" value={newOrModifiedClient.clientName || ""}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, clientName: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" id="email" placeholder="email" value={newOrModifiedClient.email || ""}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, email: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" id="password" placeholder="password" value={newOrModifiedClient.password || ""}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, password: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Phone: </label>
                        <input type="text" id="phoneNumber" placeholder="phone number" value={newOrModifiedClient.phoneNumber || ""}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, phoneNumber: e.target.value }) }} />
                    </div>
                    {newOrModifiedClient.address !== undefined
                        ?
                        <>
                            <div>Post code:
                                <input type="text" id="postCode" placeholder="post code" value={newOrModifiedClient.address[0].postCode || ""}
                                    onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient.address[0], postCode: e.target.value }) }} />
                            </div>
                            <div>City:
                                <input type="text" id="city" placeholder="city" value={newOrModifiedClient.address[0].city || ""}
                                    onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient.address[0], city: e.target.value }) }} />
                            </div>
                            <div>Str.&nr.:
                                <input type="text" id="streetAndNumber" placeholder="street and number" value={newOrModifiedClient.address[0].streetAndNumber || ""}
                                    onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient.address[0], streetAndNumber: e.target.value }) }} />
                            </div>
                            <div>Other:
                                <input type="text" id="otherInfo" placeholder="other information" value={newOrModifiedClient.address[0].otherInfo || ""}
                                    onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient.address[0], otherInfo: e.target.value }) }} />
                            </div>
                        </> : <></>
                    }
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
                    <div>
                        <button type="submit" id="submit-btn" className="btn" >
                            {updatableClientId === ""
                                ?
                                "Submit"
                                :
                                "Update"}
                        </button>
                        <button type="button" id="submit-btn" className="btn" onClick={cancelButton}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ClientForm