import { useState } from "react";

export const Login = () => {
  const [clientData, setClientData] = useState({});

  const changeToRegister = (e) => {
    console.log("register")
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    console.log(clientData);
    /*
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ clientData })

    })
      .then(res => res.json())
      .then(res => console.log(res));
      */

  }

  return (
    <>
      <div id="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <p style={{color:"white", fontSize:"12px"}}>IF YOU WANT TO ORDER YOU MUST BE LOGED IN!</p>
            <input type="text" id="clientName" placeholder="client name" required
              onChange={(e) => { setClientData({ ...clientData, clientName: e.target.value }) }} />
          </div>
          <div>
            <input type="password" id="password" placeholder="password" required
              onChange={(e) => { setClientData({ ...clientData, password: e.target.value }) }} />
          </div>
          <div>
            <button type="submit" className="btn">Login</button>
          </div>
          <div style={{ cursor:"grab" , backgroundColor: "white", color: "red", fontSize: "12px", marginTop: "50px" }}>
            <label  type="text" onClick={changeToRegister} >If you are not registered, push this box!</label>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;