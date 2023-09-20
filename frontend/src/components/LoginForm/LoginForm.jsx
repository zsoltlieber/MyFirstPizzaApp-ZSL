import { useState } from 'react';
import { useRightColumnType } from '../../contexts/RightColumnTypeContextProvider.jsx';
import { useClientContext } from "../../contexts/ClientContextProvider.jsx";

export const LoginForm = () => {
  const { setActualClientData } = useClientContext();

  const loginUrl = "/api/auth/login";
  const [loginData, setLoginData] = useState({})
  const [clientData, setClientData] = useState({});
  const [showBoxes, setShowBoxes] = useState(1);
  const [loginErrorMessage, setLoginErrorMessage] = useState("")

  const { setRightColumnType } = useRightColumnType();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginToServer = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      };
      const response = await fetch(loginUrl, requestOptions);
      const data = await response.json();
      if (response.status !== 200) {
        setLoginErrorMessage(data.message)
        setShowBoxes(2);
      }
      else {
        setClientData(data);

        const actualClient = {
          clientName: data.name,
          clientId: data.id,
          staffStatus: data.staff,
          bossStatus: data.boss
        }
        setActualClientData(actualClient)
        setShowBoxes(3);

        setTimeout(() => {
          setRightColumnType("about")
        }, 1000);
      }
    };
    loginToServer()
  }

  return (
    <div >
      {showBoxes === 1 ?
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <h2>LOGIN FORM</h2>
            <input type="email" id="email" placeholder="client email" value={loginData.email} required
              onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }} />
          </div>
          <div>
            <input type="password" id="current-password" placeholder="password" required value={loginData.password}
              onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }} />
          </div>
          <div>
            <button type="submit" className="btn" id='login-btn'>LOGIN</button>
          </div>
        </form>
        : showBoxes === 2 ?
          <div id="messages">
            <h2>{loginErrorMessage}!</h2>
            <button value="signin" onClick={(e) => setRightColumnType(e.target.value)}>
              {loginErrorMessage.split(" ")[0] === "Wrong"
                ? <p style={{ color: "red" }} >MODIFY EMAIL AND/OR PASSWORD!</p>
                : <p style={{ color: "red" }} >PLEASE ENTER IN A REGISTER!</p>
              }
            </button>
          </div>
          : showBoxes === 3 ?
            < div id="messages">
              <p>DEAR <br />{clientData.name.toUpperCase()}<br /> we are very happy to see you!!</p>
              <p>ORDER AND TASTE OUR PIZZAS :) !</p>
            </div >
            : <></>
      }
    </div >
  )
}

export default LoginForm;