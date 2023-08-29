import { useEffect, useContext } from 'react';
import { Context } from "./../../context.js"
import { MainContext } from "./../../mainContext.js"

function ClientListHandler() {

  const { actualClientData, setActualClientData, allClientData, setAllClientData } = useContext(MainContext);
  const {  setUpdatableClientId } = useContext(Context);

  const clientUrl = "/api/clients"

  const clientFetch = async (url) => {
    const response = await fetch(`${url}?isActive=true`);
    const data = await response.json();
    if (data) setAllClientData(data);
  };

  useEffect(() => {
    clientFetch(clientUrl);
  }, []);

  function deleteClientFetch(actualEndPoint, clientId) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    async function deleteClient() {
      const response = await fetch(actualEndPoint, requestOptions);
      if (response.status === 200) {
        const newClientList = actualClientData.filter(client => client._id !== clientId);
        setActualClientData(newClientList)
        console.log('Delete successful');
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
        setActualClientData(newClientList)
        console.log('Remove successful');
      } else {
        console.log("Do not want to modify other's messages!")
      }
    }
    removeClient();
  };

  const deleteClientRow = (clientId) => {
    const actualEndPoint = clientUrl + "/" + clientId;

    if (actualClientData.bossStatus === true) {
      deleteClientFetch(actualEndPoint, clientId);
    }
    else if (actualClientData !== undefined && actualClientData.clientName !== "") {
      removeClientFetch(actualEndPoint, clientId);
    }
  };

  const updateItem = (clientId) => {
    setUpdatableClientId(clientId);
    const actualClient = allClientData.find(client => client._id === clientId);
    setActualClientData(actualClient)
  };
  console.log(allClientData);
  return (
    <>
      {allClientData && allClientData !== null &&  allClientData.length > 0
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
                <th>Actív-e</th>
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
                    <td><p>{client.clientName}</p></td>
                    <td><p>{client.email}</p></td>
                    <td><p>{client.phoneNumber}</p></td>
                    <td><p>{client.isActive}</p></td>
                    <td><p>{client.isAdmin}</p></td>
                    <td><p>{client.isMainAdmin}</p></td>

                    {/*                     
                    <td><p>{client.address}</p></td> */}

                    <td >
                      <button type="button" id="delete-btn" value={client._id} onClick={(e) => deleteClientRow(e.target.value)}>DEL </button>
                    </td>
                    <td >
                      <button type='button' id="update-btn" value={client._id} onClick={(e) => updateItem(e.target.value)}>UPD</button>
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