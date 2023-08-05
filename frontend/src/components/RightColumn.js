import { useState } from "react"
import LoginForm from "./LoginForm.js"
import ActiveOrdersList from "./ActiveOrdersList.js"
import RegisterForm from "./RegisterForm.js"
import OrderForm from "./OrderForm.js"
import AboutUs from "./AboutUs.js"

const RightColumn = () => {

  const [currentForm, setCurrentForm] = useState("login")
  //const [currentForm, setCurrentForm] = useState("register")
  //const [currentForm, setCurrentForm] = useState("active_orders")
  //const [currentForm, setCurrentForm] = useState("about-us")

  return (
    <div className='rightColumn'>
      {currentForm === "login" ?
        <LoginForm />
        : currentForm === "register" ?
          <RegisterForm />
          : currentForm === "active_orders" ?
            <ActiveOrdersList />
            : currentForm === "about_us" ?
              <AboutUs />
              : currentForm === "order-form" ?
                <OrderForm />
                : <></>
      }
    </div>
  )
}

export default RightColumn