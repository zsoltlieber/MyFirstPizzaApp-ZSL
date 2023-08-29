import { useContext } from "react";
import { Context } from "./../../context.js"

function ClientForm() {

    const { updatableClientId, setUpdatableClientId, newOrModifiedClient, setNewOrModifiedClient, allClientData, setAllClientData } = useContext(Context);

    const clientUrl = "/api/clients"

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newOrModifiedClient.clientName !== "" && newOrModifiedClient.email !== "" &&
            newOrModifiedClient.phoneNumber !== "" && newOrModifiedClient.address !== ""
            && setUpdatableClientId === "") {

            const saveOnServer = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newOrModifiedClient)
                };
                const response = await fetch(clientUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    //setAllClientData([...allClientData,newOrModifiedClient])
                    setAllClientData([])
                    console.log("New client was saved!")
                }
            }
            saveOnServer()
        }
        else if (newOrModifiedClient.clientName !== "" && newOrModifiedClient.email !== "" &&
            newOrModifiedClient.phoneNumber !== "" && newOrModifiedClient.address !== ""
            && setUpdatableClientId === "") {


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
                    console.log("Modified client was saved!")
                }
                setUpdatableClientId("");
                setNewOrModifiedClient({ clientName: "" });
            }
            updateOnServer()
        }
        else console.log("Wrong data - no modification!")
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
                    <input type="text" id="clientName" placeholder="clientName" value={newOrModifiedClient.clientName || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, clientName: e.target.value }) }} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="text" id="email" placeholder="email" value={newOrModifiedClient.email || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, email: e.target.value }) }} />
                </div>
                <div>
                    <label>Phone: </label>
                    <input type="text" id="phoneNumber" placeholder="phoneNumber" value={newOrModifiedClient.phoneNumber || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, phoneNumber: [e.target.value] }) }} />
                </div>
                <div>Address:
                    <input type="text" id="address" placeholder="address separated comma" value={newOrModifiedClient.allergens || ""}
                        onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: [e.target.value] }) }} />
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