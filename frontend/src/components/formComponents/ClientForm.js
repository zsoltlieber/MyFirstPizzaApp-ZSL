import { useContext } from "react";
import { Context } from "./../../context.js"

function ClientForm() {

    const { newOrModifiedClient, setNewOrModifiedClient,
        updatableClientId, setUpdatableClientId } = useContext(Context);

    const clientUrl = "/api/clients"

    const handleSubmit = (event) => {
        event.preventDefault();

        const actualClient = {
            clientName: newOrModifiedClient.clientName,
            email: newOrModifiedClient.email,
            password:newOrModifiedClient.password,
            phoneNumber:newOrModifiedClient.phoneNumber,
            address: [{
                postCode: newOrModifiedClient.postCode,
                city: newOrModifiedClient.city,
                streetAndNumber: newOrModifiedClient.streetAndNumber,
                otherInfo:newOrModifiedClient.otherInfo || ""
            }],
            isActive: newOrModifiedClient.isActive || false,
            isAdmin: newOrModifiedClient.isAdmin || false,
            isMainAdmin: newOrModifiedClient.isMainAdmin || false
        }
console.log(actualClient);

        if (newOrModifiedClient.clientName !== "" && newOrModifiedClient.email !== "" &&
            newOrModifiedClient.phoneNumber !== "" && newOrModifiedClient.address !== []
            && setUpdatableClientId === "") {
            const saveOnServer = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualClient)
                };
                const response = await fetch(clientUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else { console.log("New client was saved!") }
            }
            saveOnServer()
        }
        else if (newOrModifiedClient.clientName !== "" && newOrModifiedClient.email !== "" &&
            newOrModifiedClient.phoneNumber !== [] && newOrModifiedClient.address !== []
            && setUpdatableClientId !== "") {

            const updateOnServer = async () => {
                const updatableClientUrl = clientUrl + "/" + updatableClientId;

                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(actualClient)
                };
                const response = await fetch(updatableClientUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    console.log("Modified client was saved!")
                }
            }
            updateOnServer()
        }
        else { console.log("Wrong data - no modification!") }
        setNewOrModifiedClient({ clientName: "" })
        setUpdatableClientId("");
    }

    function cancelButton() {
        setUpdatableClientId("");
        setNewOrModifiedClient({ clientName: "" })
    }

    return (
        <form id="client-form" onSubmit={handleSubmit}>
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
                    <input type="text" id="password" placeholder="password" value={newOrModifiedClient.password || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, password: e.target.value }) }} />
                </div>
                <div>
                    <label>Phone: </label>
                    <input type="text" id="phoneNumber" placeholder="phone number" value={newOrModifiedClient.phoneNumber || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, phoneNumber: [e.target.value] }) }} />
                </div>
                <div>Post code:
                    <input type="text" id="postCode" placeholder="post code" value={newOrModifiedClient.postCode || ""}
   /*                  <input type="text" id="postCode" placeholder="post code" value={newOrModifiedClient[0].address.postCode || ""} */
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, postCode: e.target.value }) }} />
                </div>
                <div>City:
                    <input type="text" id="city" placeholder="city" value={newOrModifiedClient.city || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, city: e.target.value }) }} />
                </div>
                <div>Street and number:
                    <input type="text" id="streetAndNumber" placeholder="street and number" value={newOrModifiedClient.streetAndNumber || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, streetAndNumber: e.target.value }) }} />
                </div>
                <div>Other info:
                    <input type="text" id="otherInfo" placeholder="other information" value={newOrModifiedClient.otherInfo || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, otherInfo: e.target.value }) }} />
                </div>
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
    )
}

export default ClientForm