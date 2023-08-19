import { useState } from "react"
import LoginForm from "../formComponents/LoginForm.js"
import MessageForm from "../formComponents/MessageForm.js"
import OrderForm from "../formComponents/OrderForm.js"
import RegistrationForm from "../formComponents/RegistrationForm.js"
import AboutUs from "./AboutUs.js"
import ActiveOrdersList from "./ActiveOrdersList.js"
import BossPage from "./BossPage.js"
import MessagesList from "./MessagesList.js"
import StaffPage from "./StaffPage.js"

const RightColumn = ({ setRightColumnTypeData, rightColumnTypeSet, actualClientSet, setActualClientData,
  pizzaTypesDataSet, actualOrderedPizzaId }) => {

  const [newMessage, setNewMessage] = useState([]);
  const [listOfOrders, setListOfOrders] = useState({});

  return (
    <div className='rightColumn'>
      {rightColumnTypeSet === "login" ?
        <LoginForm setCurrentForm={setRightColumnTypeData} setActualClient={setActualClientData} />
        : <></>}
      {rightColumnTypeSet === "signin" ?
        <RegistrationForm currentFormSet={rightColumnTypeSet} setCurrentForm={setRightColumnTypeData} />
        : <></>}
      {rightColumnTypeSet === "about" ?
        <AboutUs />
        : <></>}
      {rightColumnTypeSet === "message" ?
        <>
          <MessageForm actualClientData={actualClientSet} setNewMessageData={setNewMessage} />
          <MessagesList actualClientData={actualClientSet} newMessageData={newMessage} setNewMessageData={setNewMessage} />
        </>
        : <></>}
      {rightColumnTypeSet === "order-form" ?
        <OrderForm actualClientData={actualClientSet} actualOrderedPizzaIdSet={actualOrderedPizzaId} allPizzaTypesData={pizzaTypesDataSet}
          listOfOrdersSet={listOfOrders} setListOfOrdersData={setListOfOrders} currentFormSet={rightColumnTypeSet} setCurrentForm={setRightColumnTypeData} />
        : <></>}
      {rightColumnTypeSet === "order-list" ?
        <ActiveOrdersList actualClientData={actualClientSet} listOfOrdersDataSet={listOfOrders} setListOfOrdersData={setListOfOrders} />
        : <></>}
      {rightColumnTypeSet === "staff" ?
        <StaffPage actualClientData={actualClientSet} />
        : <></>}
      {rightColumnTypeSet === "boss" ?
        <BossPage actualClientData={actualClientSet} />
        : <></>
      }
    </div>
  )
}

export default RightColumn