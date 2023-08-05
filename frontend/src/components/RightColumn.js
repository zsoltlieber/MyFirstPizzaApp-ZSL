import { useEffect, useState } from "react"
import LoginForm from "./LoginForm.js"
import ActiveOrdersList from "./ActiveOrdersList.js"
import SignInForm from "./RegistrationForm.js"
import OrderForm from "./OrderForm.js"
import AboutUs from "./AboutUs.js"

const RightColumn = ({ rightBlock } ) => {
 
  const [currentForm, setCurrentForm] = useState("")
  
  useEffect(() => {
    setCurrentForm(rightBlock);
  }, [rightBlock])

  return (
    <div className='rightColumn'>
      {currentForm === "login" ?
        <LoginForm />
        : currentForm === "signin" ?
          <SignInForm />
          : currentForm === "active_orders" ?
            <ActiveOrdersList />
            : currentForm === "about" ?
              <AboutUs />
              : currentForm === "order-form" ?
                <OrderForm />
                : <></>
      }
    </div>
  )
}

export default RightColumn