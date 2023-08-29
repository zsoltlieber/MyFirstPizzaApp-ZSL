import {  useContext } from "react";
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

function ClientForm() {
    const { actualClientData } = useContext(MainContext);
    const { updatableClientId, setUpdatableClientId, newOrModifiedClient, setNewOrModifiedClient } = useContext(Context);

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
                    body: JSON.stringify(actualClientData)
                };
                const response = await fetch(clientUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    console.log("New client type was saved!")
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
                    body: JSON.stringify(actualClientData)
                };
                const response = await fetch(updatableClientUrl, requestOptions);
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data)
                }
                else {
                    console.log("New client type was saved!")
                }
                setUpdatableClientId("");
            }
            updateOnServer()
        }
        else console.log("Wrong data - no modification!")
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
                  <input type="text" id="clientName" placeholder="clientName" value={newOrModifiedClient.clientName || ""} required
                      onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, clientName: e.target.value }) }} />
              </div>
              <div>
                  <input type="text" id="email" placeholder="email" value={newOrModifiedClient.email || ""} required
                      onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, email: e.target.value }) }} />
              </div>
              <div>
                  <input type="text" id="phoneNumber" placeholder="phoneNumber" value={newOrModifiedClient.phoneNumber || ""} required
                      onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, phoneNumber: [e.target.value] }) }} />
              </div>
              <div>
                  <input type="text" id="address" placeholder="address separated comma" value={newOrModifiedClient.allergens || ""} required
                      onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, address: [e.target.value] }) }} />
              </div>
              <div>
                  <input type="text" id="isActive" placeholder="isActive true/false" value={newOrModifiedClient.isActive || ""} required
                      onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, isActive: e.target.value }) }} />
              </div>
              <div>
                  <input type="text" id="isAdmin" placeholder="isAdmin true/false" value={newOrModifiedClient.isActive || ""} required
                      onChange={(e) => { setNewOrModifiedClient({ ...newOrModifiedClient, isAdmin: e.target.value }) }} />
              </div>
              <div>
                  <input type="text" id="isMainAdmin" placeholder="isMainAdmin true/false" value={newOrModifiedClient.isActive || ""} required
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
              </div>
          </div>
      </form>
  )
}

export default ClientForm