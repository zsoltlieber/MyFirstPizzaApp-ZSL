import { useState } from "react";

export function Register() {
    const [clientData, setClientData] = useState({});

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
            <div id="register-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" id="clientName" placeholder="client name" required
                            onChange={(e) => { setClientData({ ...clientData, clientName: e.target.value }) }} />
                    </div>
                    <div>
                        <input type="email" id="email" placeholder="email" required
                            onChange={(e) => { setClientData({ ...clientData, email: e.target.value }) }} />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="password" required
                            onChange={(e) => { setClientData({ ...clientData, password: e.target.value }) }} />
                    </div>
                    <div>
                        <input type="text" id="phoneNumber" placeholder="phoneNumber" required
                            onChange={(e) => { setClientData({ ...clientData, phoneNumber: e.target.value }) }} />
                    </div>
                    <div>
                        <input type="text" id="postCode" placeholder="postCode" required
                            onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, postCode: e.target.value } }) }} />
                    </div>
                    <div>
                        <input type="text" id="city" placeholder="city" required
                            onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, city: e.target.value } }) }} />
                    </div>
                    <div>
                        <input type="text" id="streatAndNumber" placeholder="streatAndNumber" required
                            onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, streatAndNumber: e.target.value } }) }} />
                    </div>
                    <div>
                        <input type="text" id="otherInfo" placeholder="otherInfo" required
                            onChange={(e) => { setClientData({ ...clientData, address: { ...clientData.address, otherInfo: e.target.value } }) }} />
                    </div>
                    <div>
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;