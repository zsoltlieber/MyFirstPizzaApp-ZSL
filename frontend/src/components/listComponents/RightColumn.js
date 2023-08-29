import { useState, useContext } from "react";
import LoginForm from "../formComponents/LoginForm.js";
import RegistrationForm from "../formComponents/RegistrationForm.js";
import OrderForm from "../formComponents/OrderForm.js";
import OrderList from "./OrderList.js";
import MessageForm from "../formComponents/MessageForm.js";
import MessagesList from "./MessagesList.js";
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
    allergens, setAllergens, rejectedAllergens, setRejectedAllergens,
    allPizzaTypes, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder,
    rightColumnType, setRightColumnType
  } = useContext(MainContext);

  const [newOrModifiedClient, setNewOrModifiedClient] = useState([]); //for new and updatable client
  const [updatableClientId, setUpdatableClientId] = useState("");
  const [newAllergen, setNewAllergen] = useState([]);//for new and updatable allergen
  const [updatableAllegenId, setUpdatableAllergenId] = useState("");
  const [newPizzaType, setNewPizzaType] = useState([]);//for new and updatable pizzaType
  const [updatablePizzaTypeId, setUpdatablePizzaTypeId] = useState("");
  const [listOfOrders, setListOfOrders] = useState([]);  //total list of orders
  const [showPreOrderList, setShowPreOrderList] = useState(false) // show or not show total pre-list of orders
  const [actualOrderItems, setActualOrderItems] = useState([]);
  const [showOrderThanks, setShowOrderThanks] = useState(false)
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showTopMessageBox, setShowTopMessageBox] = useState(true);
  const [showMessageThanks, setShowMessageThanks] = useState(false);
  const [updatableMessageId, setUpdatableMessageId] = useState("");

  return (
    <MainContext.Provider value={{
      actualClientData, setActualClientData, allClientData, setAllClientData,
      allergens, setAllergens, rejectedAllergens, setRejectedAllergens, allPizzaTypes, setAllPizzaTypes,
      pizzaIdToOrder, setPizzaIdToOrder, actualOrderItems, setActualOrderItems,
      showTopMessageBox, setShowTopMessageBox, showOrderThanks, setShowOrderThanks,
      rightColumnType, setRightColumnType,
    }}>
      <Context.Provider value={{
        newOrModifiedClient, setNewOrModifiedClient, updatableClientId, setUpdatableClientId,
        newAllergen, setNewAllergen, updatableAllegenId, setUpdatableAllergenId,
        newPizzaType, setNewPizzaType, updatablePizzaTypeId, setUpdatablePizzaTypeId,
        listOfOrders, setListOfOrders, showPreOrderList, setShowPreOrderList,
        messageList, setMessageList, newMessage, setNewMessage, updatableMessageId, setUpdatableMessageId,
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
            : <></>}
          {rightColumnType === "client-handler" ?
            <>
              <ClientForm />
              <ClientListHandler />
            </>
            : <></>}
          {rightColumnType === "allergens-handler" ?
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