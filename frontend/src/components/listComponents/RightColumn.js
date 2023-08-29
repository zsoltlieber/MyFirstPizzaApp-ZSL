import { useState, useContext } from "react";
import LoginForm from "../formComponents/LoginForm.js";
import RegistrationForm from "../formComponents/RegistrationForm.js";
import OrderForm from "../formComponents/OrderForm.js";
import OrderListHandler from "./OrderListHandler.js";
import MessageForm from "../formComponents/MessageForm.js";
import MessageListHandler from "./MessageListHandler.js";
import AboutUs from "./AboutUs.js";
import BossPage from "./BossPage.js";
import StaffPage from "./StaffPage.js";
import ClientForm from "../formComponents/ClientForm.js";
import ClientListHandler from "./ClientListHandler.js";
import AllergenForm from "../formComponents/AllergenForm.js";
import AllergenListHandler from "./AllergenListHandler.js";
import PizzaTypeForm from "../formComponents/PizzaTypeForm.js";
import PizzaTypeListHandler from "./PizzaTypeListHandler.js";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js";

const RightColumn = ({ setSearchFieldChange }) => {

  const {
    actualClientData, setActualClientData, allClientData, setAllClientData,
    allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
    allPizzaTypes, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder,
    rightColumnType, setRightColumnType
  } = useContext(MainContext);

  const [newOrModifiedClient, setNewOrModifiedClient] = useState([]); //for new and updatable client
  const [updatableClientId, setUpdatableClientId] = useState("");
  const [newOrModifedAllergen, setNewOrModifiedAllergen] = useState([]);//for new and updatable allergen
  const [updatableAllegenId, setUpdatableAllergenId] = useState("");
  const [newOrModifiedPizzaType, setNewOrModifiedPizzaType] = useState([]);//for new and updatable pizzaType
  const [updatablePizzaTypeId, setUpdatablePizzaTypeId] = useState("");
  const [actualOrderItems, setActualOrderItems] = useState([]);
  const [listOfOrders, setListOfOrders] = useState([]);  //total list of orders
  const [showPreOrderList, setShowPreOrderList] = useState(false) // show or not show total pre-list of orders
  const [messageList, setMessageList] = useState([]);
  const [newOrModifiedMessage, setNewOrModifiedMessage] = useState('');
  const [updatableMessageId, setUpdatableMessageId] = useState("");
  const [showOrderThanks, setShowOrderThanks] = useState(false)
  const [showMessageThanks, setShowMessageThanks] = useState(false);
  const [showTopMessageBox, setShowTopMessageBox] = useState(true);

  return (
    <MainContext.Provider value={{
      actualClientData, setActualClientData, allClientData, setAllClientData,
      allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
      allPizzaTypes, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder,
      rightColumnType, setRightColumnType
    }}>
      <Context.Provider value={{
        newOrModifiedClient, setNewOrModifiedClient, updatableClientId, setUpdatableClientId,
        newOrModifedAllergen, setNewOrModifiedAllergen, updatableAllegenId, setUpdatableAllergenId,
        newOrModifiedPizzaType, setNewOrModifiedPizzaType, updatablePizzaTypeId, setUpdatablePizzaTypeId,
        actualOrderItems, setActualOrderItems, listOfOrders, setListOfOrders, showPreOrderList, setShowPreOrderList,
        messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage, updatableMessageId, setUpdatableMessageId,
        showOrderThanks, setShowOrderThanks, showMessageThanks, setShowMessageThanks, showTopMessageBox, setShowTopMessageBox
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
              <MessageListHandler />
            </>
            : <></>}
          {rightColumnType === "order-form" ?
            <>
              <OrderForm />
              <OrderListHandler />
            </>
            : <></>}
          {rightColumnType === "staff" ?
            <StaffPage />
            : <></>}
          {rightColumnType === "boss" ?
            <BossPage />
            : <></>}
          {rightColumnType === "client-handler" ?
            <>
              <ClientForm />
              <ClientListHandler />
            </>
            : <></>}
          {rightColumnType === "allergen-handler" ?
            <>
              <AllergenForm />
              <AllergenListHandler />
            </>
            : <></>}
          {rightColumnType === "pizza-type-handler" ?
            <>
              <PizzaTypeForm />
              <PizzaTypeListHandler />
            </>
            : <></>
          }
        </div>
      </Context.Provider>
    </MainContext.Provider>
  )
}

export default RightColumn