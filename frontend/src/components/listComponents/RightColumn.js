import { useState } from "react";
import LoginForm from "../formComponents/LoginForm.js";
import MessageForm from "../formComponents/MessageForm.js";
import OrderForm from "../formComponents/OrderForm.js";
import ActiveOrdersList from "./ActiveOrdersList.js";
import RegistrationForm from "../formComponents/RegistrationForm.js";
import AboutUs from "./AboutUs.js";
import BossPage from "./BossPage.js";
import MessagesList from "./MessagesList.js";
import StaffPage from "./StaffPage.js";

const RightColumn = ({ setRightColumnTypeData, rightColumnTypeSet, actualClientSet, setActualClientData,
  setLogoutClientData, pizzaTypesDataSet, actualOrderedPizzaIdDataSet }) => {

  const [messageList, setMessageList] = useState([]);
  const [listOfOrders, setListOfOrders] = useState({});

  return (
    <div className='rightColumn'>
      {rightColumnTypeSet === "login" ?
        <LoginForm setCurrentForm={setRightColumnTypeData} setActualClient={setActualClientData} setClientLogout={setLogoutClientData} />
        : <></>}
      {rightColumnTypeSet === "signin" ?
        <RegistrationForm currentFormSet={rightColumnTypeSet} setCurrentForm={setRightColumnTypeData} />
        : <></>}
      {rightColumnTypeSet === "about" ?
        <AboutUs />
        : <></>}
      {rightColumnTypeSet === "message" ?
        <>
          <MessageForm actualClientData={actualClientSet} messageListDataSet={messageList} setMessageList={setMessageList} />
          <MessagesList actualClientData={actualClientSet} messageListData={messageList} setMessageListData={setMessageList} />
        </>
        : <></>}
      {rightColumnTypeSet === "order-form" ?
        <>
          <OrderForm actualClientData={actualClientSet} actualOrderedPizzaIdSet={actualOrderedPizzaIdDataSet} allPizzaTypesData={pizzaTypesDataSet}
            listOfOrdersSet={listOfOrders} setListOfOrdersData={setListOfOrders} currentFormSet={rightColumnTypeSet} setCurrentForm={setRightColumnTypeData} />
          < ActiveOrdersList actualClientDataSet={actualClientSet} listOfOrders={listOfOrders} pizzaTypesDataSet={pizzaTypesDataSet} />
        </>
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