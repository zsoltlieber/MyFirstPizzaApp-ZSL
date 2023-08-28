import { useState, useContext } from "react";
import LoginForm from "../formComponents/LoginForm.js";
import MessageForm from "../formComponents/MessageForm.js";
import OrderForm from "../formComponents/OrderForm.js";
import OrderList from "./OrderList.js";
import RegistrationForm from "../formComponents/RegistrationForm.js";
import AboutUs from "./AboutUs.js";
import BossPage from "./BossPage.js";
import MessagesList from "./MessagesList.js";
import StaffPage from "./StaffPage.js";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js";

const RightColumn = ({ setSearchFieldChange }) => {

  const { actualClientData, setActualClientData, rightColumnType, setRightColumnType, allPizzaTypes,
    rejectedAllergens, setRejectedAllergens, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder } = useContext(MainContext);

  const [listOfOrders, setListOfOrders] = useState([]);  //total list of orders
  const [showPreOrderList, setShowPreOrderList] = useState(false) // show or not show total pre-list of orders
  const [messageList, setMessageList] = useState([]);
  const [showMessageThanks, setShowMessageThanks] = useState(false);
  const [updatableMessageId, setUpdatableMessageId] = useState("");

  return (
    <MainContext.Provider value={{
      actualClientData, setActualClientData, rightColumnType, setRightColumnType, allPizzaTypes,
      rejectedAllergens, setRejectedAllergens, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder
    }}>

      <Context.Provider value={{
        messageList, setMessageList, updatableMessageId, setUpdatableMessageId,
        showPreOrderList, setShowPreOrderList, listOfOrders, setListOfOrders,
        showMessageThanks, setShowMessageThanks
      }}>
        <div className='right-column'>
          {rightColumnType === "login" ?
            <LoginForm />
            : <></>}
          {rightColumnType === "signin" ?
            <RegistrationForm />
            : <></>}
          {rightColumnType === "about" ?
            <AboutUs setSearchText={setSearchFieldChange} />
            : <></>}
          {rightColumnType === "message" ?
            <>
              <MessageForm />
              <MessagesList />
            </>
            : <></>}
          {rightColumnType === "order-form" ?
            <>
              <OrderForm />
              <OrderList />
            </>
            : <></>}
          {rightColumnType === "staff" ?
            <StaffPage />
            : <></>}
          {rightColumnType === "boss" ?
            <BossPage />
            : <></>
          }
        </div>
      </Context.Provider>
    </MainContext.Provider>
  )
}

export default RightColumn