import { useState } from "react"
import Login from "./Login.js"
import OrderList from "./OrderList.js"
import SignIn from "./Register.js"

const RightColumn = () => {

  const [currentForm, setCurrentForm] = useState("login")

  return (
    <div className='rightColumn'>
      {currentForm === "login" ?
        <Login />
        : currentForm === "register" ?
        <SignIn />
        : <OrderList />
      }
    </div>
  )
}

export default RightColumn