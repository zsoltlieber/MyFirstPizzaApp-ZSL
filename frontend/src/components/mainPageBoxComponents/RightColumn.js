import { useState } from "react"
import LoginForm from "../loginComponents/LoginForm.js"
import RegistrationForm from "../loginComponents/RegistrationForm.js"
import OrderForm from "../formComponents/OrderForm.js"
import AboutUs from "../listComponents/AboutUs.js"
import MessagesList from "../listComponents/MessagesList.js"
import MessageForm from "../formComponents/MessageForm.js"
import BossPage from "../listComponents/BossPage.js"
import StaffPage from "../listComponents/StaffPage.js"


const RightColumn = ({ setRightBlock, rightBlockSet, setActualClientData, actualClientSet, setNewMessageData, newMessageSet }) => {

  const [newMessage, setNewMessage] = useState([]);

  return (
    <div className='rightColumn'>
      {rightBlockSet === "login" ?
        <LoginForm setCurrentForm={setRightBlock} setActualClientData={setActualClientData} />
        : <></>}
      {rightBlockSet === "signin" ?
        <RegistrationForm currentFormSet={rightBlockSet} setCurrentForm={setRightBlock} />
        : <></>}
      {rightBlockSet === "about" ?
        <AboutUs />
        : <></>}
      {rightBlockSet === "message" ?
        <>
          <MessageForm actualClientData={actualClientSet} setActualNewMessage={setNewMessage} />
          <MessagesList actualClientData={actualClientSet} newMessageSet={newMessage} />
        </>
        : <></>}
      {rightBlockSet === "order" ?
        <OrderForm actualClientData={actualClientSet} />
        : <></>}
      {rightBlockSet === "staff" ?
        <StaffPage actualClientData={actualClientSet} />
        : <></>}
      {rightBlockSet === "boss" ?
        <BossPage actualClientData={actualClientSet} />
        : <></>
      }
    </div>
  )
}

export default RightColumn