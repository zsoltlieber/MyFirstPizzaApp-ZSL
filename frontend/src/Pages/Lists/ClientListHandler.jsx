import { useEffect, useContext } from 'react';
import { Context } from "../../context.js"
import { MainContext } from "../../mainContext.js"

function ClientListHandler() {

  const { actualClientData, allClientData, setAllClientData, itemIsActiveStatus } = useContext(MainContext);
  const { setUpdatableClientId, newOrModifiedClient, setNewOrModifiedClient } = useContext(Context);

  const clientUrl = "/api/clients"

  const clientFetch = async (url) => {
    const actualUrl = `${url}?isActive=${itemIsActiveStatus}`
    const response = await fetch(actualUrl);
    const data = await response.json();
    if (data) setAllClientData(data);
  };

  useEffect(() => {
    clientFetch(clientUrl);
  }, [newOrModifiedClient]);

  function deleteClientFetch(actualEndPoint, clientId) {

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    async function deleteClient() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newClientList = allClientData.filter(client => client._id !== clientId);
        setAllClientData(newClientList)
        console.log('Client delete was successful');
      } else {
        console.log("Problem with client delete!")
      }
    }
    deleteClient();

  };

  function removeClientFetch(actualEndPoint, clientId) {

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false })
    };
    async function removeClient() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newClientList = allClientData.filter(client => client._id !== clientId);
        setAllClientData(newClientList)
        console.log('Client remove was successful');
      } else {
        console.log("Problem with client remove!")
      }
    }
    removeClient();
  };

  const deleteClientRow = (clientId) => {
    const actualEndPoint = clientUrl + "/" + clientId;

    if (actualClientData.bossStatus === true && allClientData.length > 2) {
      deleteClientFetch(actualEndPoint, clientId);
    }
    else if (actualClientData.bossStatus !== true && allClientData.length > 2) {
      removeClientFetch(actualEndPoint, clientId);
    }
  };

  const updateItem = (clientId) => {
    setUpdatableClientId(clientId);
    const actualClient = allClientData.find(client => client._id === clientId);
    setNewOrModifiedClient(actualClient)
  };

  return (
    <>
      {allClientData && allClientData !== null && allClientData.length > 0
        ?
        < div id='client-list' >
          <p style={{ textAlign: "center", fontSize: "20px", margin: "0" }} >CLIENT LIST</p>

          <table id="client-list-table">
            <thead>
              <tr>
                <th>Client name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Address</th>
                <th>Actív?</th>
                <th>Staff?</th>
                <th>Boss?</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {allClientData.map((client, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td><p style={{ width: "150px", textAlign: "left" }}>{client.clientName}</p></td>
                    <td><p style={{ textAlign: "left" }}>{client.email}</p></td>
                    <td><p style={{ width: "150px" }}>{client.phoneNumber}</p></td>
                    <td><p style={{ width: "250px", textAlign: "left" }}>{client.address.postCode},{client.address.city},{client.address.streetAndNumber},<br></br>{client.address.otherInfo}</p></td>
                    <td><p style={{ width: "80px" }}>{client.isActive ? "X" : "-"}</p></td>
                    <td><p style={{ width: "80px" }}>{client.isAdmin ? "X" : "-"}</p></td>
                    <td><p style={{ width: "80px" }}>{client.isMainAdmin ? "X" : "-"}</p></td>

                    <td >
                      <button type="text" id="delete-btn" value={client._id} onClick={(e) => deleteClientRow(e.target.value)}>DEL </button>
                    </td>
                    <td >
                      <button type='text' id="update-btn" value={client._id} onClick={(e) => updateItem(e.target.value)}>UPD</button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table >
        </div>
        : <></>}
    </ >
  )
}

export default ClientListHandler