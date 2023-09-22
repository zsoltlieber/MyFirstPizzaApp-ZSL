import { useClientContext } from "../../contexts/ClientContextProvider.jsx";

function ClientListHandler() {

  const { allClientData, updateClient, deleteClient } = useClientContext();

  return (
    <>
      {allClientData
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
            {allClientData.map((client) => {
              return (
                <tbody key={client._id}>
                  <tr>
                    <td><p style={{ width: "150px", textAlign: "left" }}>{client.clientName}</p></td>
                    <td><p style={{ textAlign: "left" }}>{client.email}</p></td>
                    <td><p style={{ width: "150px" }}>{client.phoneNumber}</p></td>
                    <td><p style={{ width: "250px", textAlign: "left" }}>{client.address[0].postCode},{client.address[0].city},{client.address[0].streetAndNumber},<br></br>{client.address[0].otherInfo}</p></td>
                    <td><p style={{ width: "80px" }}>{client.isActive ? "X" : "-"}</p></td>
                    <td><p style={{ width: "80px" }}>{client.isAdmin ? "X" : "-"}</p></td>
                    <td><p style={{ width: "80px" }}>{client.isMainAdmin ? "X" : "-"}</p></td>

                    <td >
                      <button type="text" id="delete-btn" value={client._id} onClick={(e) => deleteClient(e.target.value)}>DEL </button>
                    </td>
                    <td >
                      <button type='text' id="update-btn" value={client._id} onClick={(e) => updateClient(e.target.value)}>UPD</button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table >
        </div>
        : null}
    </ >
  )
}

export default ClientListHandler