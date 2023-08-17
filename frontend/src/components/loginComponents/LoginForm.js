import { useState } from "react";

export const LoginForm = ({ setCurrentForm, setActualClientData }) => {

  //const loginUrl = "http://localhost:8080/api/auth/login";
  const loginUrl = "/api/auth/login";

  const [clientData, setClientData] = useState({});
  const [showBoxes, setShowBoxes] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginToServer = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(clientData)
      };
      const response = await fetch(loginUrl, requestOptions);
      const data = await response.json();
      if (response.status !== 200) {
        setShowBoxes(2);
      }
      else {
        setClientData(data);
        const actualClient = { clientName: data.name, clientId: data.id, staffStatus: data.staff, bossStatus: data.boss }
        setActualClientData(actualClient)
        setShowBoxes(3);
     
        setTimeout(() => {
          setCurrentForm("")
        }, 2000);
     
      }
    };
    loginToServer()
  }

  return (
    <div >
      {showBoxes === 1 ?
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <p style={{ color: "white", fontSize: "12px" }}>IF YOU WANT TO ORDER YOU MUST BE LOGED IN!</p>
            <input type="text" id="clientName" placeholder="client name" value={clientData.clientName || ""} required
              onChange={(e) => { setClientData({ ...clientData, clientName: e.target.value }) }} />
          </div>
          <div>
            <input type="password" id="password" placeholder="password" value={clientData.password || ""} required
              onChange={(e) => { setClientData({ ...clientData, password: e.target.value }) }} />
          </div>
          <div>
            <button type="submit" className="btn">Login</button>
          </div>
        </form>
        : showBoxes === 2 ?
          <div id="messages">
            <h2>CLIENT NOT FOUND!</h2>
            <button value="signin" onClick={(e) => setCurrentForm(e.target.value)}>PLEASE DO SIGN IN!</button>
          </div>
          : showBoxes === 3 ?
            < div id="messages">
              <p>Dear <br />{clientData.name.toUpperCase()}<br /> we are very happy to see you!!</p>
              <p>ORDER AND TASTE OUR PIZZAS :) !</p>
            </div >
            : <></>
      }
    </div >
  )
}

export default LoginForm;