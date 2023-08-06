import { useEffect, useState } from "react"
import LoginForm from "../loginComponents/LoginForm.js"
import SignInForm from "../loginComponents/RegistrationForm.js"
import OrderForm from "../formComponents/OrderForm.js"
import AboutUs from "../listComponents/AboutUs.js"
import MessagesList from "../listComponents/MessagesList.js"
import MessageForm from "../formComponents/MessageForm.js"
import BossPage from "../listComponents/BossPage.js"
import StaffPage from "../listComponents/StaffPage.js"


const RightColumn = ({ rightBlockSet }) => {

  const [currentForm, setCurrentForm] = useState("")

  useEffect(() => {
    setCurrentForm(rightBlockSet);
  }, [rightBlockSet])

  return (
    <div className='rightColumn'>
      {currentForm === "login" ?
        <LoginForm currentForm={currentForm} setCurrentForm={setCurrentForm} />
        : currentForm === "signin" ?
          <SignInForm currentForm={currentForm} setCurrentForm={setCurrentForm} />
          : currentForm === "about" ?
            <AboutUs />
            : currentForm === "message" ?
              <>
                <MessageForm />
                <MessagesList />
              </>
              : currentForm === "order" ?
                <OrderForm />
                : currentForm === "staff" ?
                  <StaffPage />
                  : currentForm === "boss" ?
                    <BossPage />
                    : <></>
      }
    </div>
  )
}

export default RightColumn