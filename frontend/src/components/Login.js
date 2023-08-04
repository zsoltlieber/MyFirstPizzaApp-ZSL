import { useState } from "react";

export const Login = () => {



  const [client, setClient] = useState({
    "clientName": "",
    "password": ""
  })
  const [value, setValue] = useState(0);

  function handleClientName(e) {
    setClient
      ({
        ...client,
        clientName: e.target.value
      })
  }
  function handlePassword(e) {
    setClient
      ({
        ...client,
        password: e.target.value
      })
  }

  function submitClientCheckerData(client) {

    if (client["clientName"] !== "" && client["password"] !== "") {

      const clientData = {
        ...client,
        clientName: client.clientName,
        password: client.password
      };
      
      console.log(clientData);
      
      fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
        
      })
        .then(res => res.json())
        .then(res => setValue(res));

      setClient
        ({
          "clientName": "",
          "password": ""
        });

    }
  }

  return (
    <div id="login-fields">
      <input placeholder="clientName" type="text" value={client.clientName} onChange={handleClientName}></input>
      <input placeholder="password" type="password" value={client.password} onChange={handlePassword}></input>
      <button className="btn" onClick={() => { submitClientCheckerData(client); }}>Login</button>
    </div>
  )
}
export default Login;
