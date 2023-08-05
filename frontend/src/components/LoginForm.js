import { useState } from "react";


export const LoginForm = (props) => {
  const loginUrl = "http://localhost:8080/api/auth/login"
  const [clientData, setClientData] = useState({});
  const [rightBoxForm, setRightBoxForm] = useState("about-us")

  const backToRegister = (e) => {
    if (rightBoxForm !== "register") {
      setRightBoxForm("register")
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    const loginToServer = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      };
      const response = await fetch(loginUrl, requestOptions);
      const data = await response.json();
      if (response.status !== 200) { console.log(data.message) }
      else { 
        localStorage.setItem('userName_myapp', data.name);
        localStorage.setItem('userId_myapp', data.id);
        setClientData({});
      }
    };
    loginToServer()
  }

  return (
    <>
      <div id="login-form">
        <form onSubmit={handleSubmit}>
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
      </div>
    </>
  )
}

export default LoginForm;