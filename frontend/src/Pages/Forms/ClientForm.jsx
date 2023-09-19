import { useContext } from "react";
import { Context } from "../../context.js"
import { useRightColumnType } from "../../contexts/RightColumnContextProvider.jsx";

function ClientForm() {
    const { newOrModifiedClient, setNewOrModifiedClient,
        updatableClientId, setUpdatableClientId } = useContext(Context);

    const rightColumnTypeHandler = useRightColumnType();    
    
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
        isActive: "",
        isAdmin: "",
        isMainAdmin: "",
    };

    const clientUrl = "/api/clients"

    const handleSubmit = (event) => {
        event.preventDefault();
console.log(newOrModifiedClient);
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
                    setNewOrModifiedClient(emptyClient);
                    setUpdatableClientId("");
                    console.log("New client was saved!")
                }
            }
            saveOnServer()
        }
        else if (newOrModifiedClient.clientName !== "" && updatableClientId !== "") {

            const updateOnServer = async () => {
                const updatableClientUrl = clientUrl + "/" + updatableClientId;
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
                    setNewOrModifiedClient(emptyClient);
                    setUpdatableClientId("");
                    console.log("Modified client was saved!")
                }
            }
            updateOnServer()
        }
        else { console.log("Wrong data - no modification!") }
    }

    function cancelButton() {
        setNewOrModifiedClient(emptyClient)
        setUpdatableClientId("");
    }

    if (newOrModifiedClient === undefined) setNewOrModifiedClient();

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
                        <input type="text" id="clientName" placeholder="client name" value={newOrModifiedClient.clientName}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, clientName: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" id="email" placeholder="email" value={newOrModifiedClient.email}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, email: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" id="password" placeholder="password" value={newOrModifiedClient.password}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, password: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Phone: </label>
                        <input type="text" id="phoneNumber" placeholder="phone number" value={newOrModifiedClient.phoneNumber}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, phoneNumber: e.target.value }) }} />
                    </div>
                    <div>Post code:
                        <input type="text" id="postCode" placeholder="post code" value={newOrModifiedClient.address[0].postCode}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: [{ ...newOrModifiedClient.address[0], postCode: e.target.value }] }) }} />
                    </div>

                    <div>City:
                        <input type="text" id="city" placeholder="city" value={newOrModifiedClient.address[0].city}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: [{ ...newOrModifiedClient.address[0], city: e.target.value }] }) }} />
                    </div>
                    <div>Str.&nr.:
                        <input type="text" id="streetAndNumber" placeholder="street and number" value={newOrModifiedClient.address[0].streetAndNumber}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: [{ ...newOrModifiedClient.address[0], streetAndNumber: e.target.value }] }) }} />
                    </div>
                    <div>Other:
                        <input type="text" id="otherInfo" placeholder="other information" value={newOrModifiedClient.address[0].otherInfo}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: [{ ...newOrModifiedClient.address[0], otherInfo: e.target.value }] }) }} />
                    </div>
                    <div>Active?
                        <input type="text" id="isActive" placeholder="isActive true/false" value={newOrModifiedClient.isActive}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, isActive: e.target.value }) }} />
                    </div>
                    <div>Admin?
                        <input type="text" id="isAdmin" placeholder="isAdmin true/false" value={newOrModifiedClient.isAdmin}
                            onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, isAdmin: e.target.value }) }} />
                    </div>
                    <div>Boss ?
                        <input type="text" id="isMainAdmin" placeholder="isMainAdmin true/false" value={newOrModifiedClient.isMainAdmin}
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
                        <button type="text" className="btn" onClick={cancelButton}>Cancel</button>
                        <button type="text" className="btn" value={"about"} onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)}>BACK</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ClientForm