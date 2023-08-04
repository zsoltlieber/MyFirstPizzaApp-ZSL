import { useState } from "react";

export function SignIn() {

    const [client, setClient] = useState({
        "clientName": "",
        "email": "",
        "password": "",
        "dateOfBirth": "",
        "height": ""
    })
    const [value, setValue] = useState(0);

    const [show, setShow] = useState(false)


    function handleClientNameChange(e) {
        setClient
            ({
                ...client,
                clientName: e.target.value
            })
    }
    function handleEmailChange(e) {
        setClient
            ({
                ...client,
                email: e.target.value
            })
    }
    function handlePasswordChange(e) {
        setClient
            ({
                ...client,
                password: e.target.value
            })
    }
    function handleDateOfBirthChange(e) {
        setClient
            ({
                ...client,
                dateOfBirth: e.target.value
            })
    }
    function handleHeightChange(e) {
        setClient
            ({
                ...client,
                height: e.target.value
            })
    }

    function showMoreDataFields() {
        setShow(true)
    }

    function submitClientData(client) {

        if (client["clientName"] !== "" && client["email"] !== "" && client["password"] !== "") {

            const clientData = {
                ...client,
                clientName: client.clientName,
                email: client.email,
                password: client.password
            };

            fetch('/api/client/add-client', {
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
                    "email": "",
                    "password": "",
                    "dateOfBirth": "",
                    "height": ""
                });
            setShow(false);
        }
    }

    return (
        <div className="container-login">
            <div id="login-table">
                <div id="login-fields">
                    <input placeholder="clientName" type="text" value={client.clientName} onChange={handleClientNameChange}></input>
                    <input placeholder="email" type="text" value={client.email} onChange={handleEmailChange}></input>
                    <input placeholder="password" type="password" value={client.password} onChange={handlePasswordChange}></input>
                    {show ?
                        (
                            <>
                                <span>
                                    <label><small>Date of Birth</small></label>
                                    <input placeholder="dateOfBirth" type="date" value={client.dateOfBirth} onChange={handleDateOfBirthChange}></input>
                                </span>
                                <input placeholder="height" type="text" value={client.height} onChange={handleHeightChange}></input>
                                <button className="submitBtn" onClick={() => { submitClientData(client); }}>Sign in</button>
                            </>
                        )
                        : null}
                </div>
                {!show ?
                    (
                        <div>
                            <span>
                                <p>If you want to save your personal data for calculate BMI please give more information </p>
                                <button className="submitBtn" onClick={showMoreDataFields}>Click here</button>
                            </span>
                        </div>
                    )
                    : null}
            </div>
        </div>
    )
}
export default SignIn;
