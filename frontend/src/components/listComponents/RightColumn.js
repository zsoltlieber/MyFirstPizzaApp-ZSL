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
import ClientListHandler from "./ClientListHandler.js";
import AllergenForm from "../formComponents/AllergenForm.js";
import AllergenListHandler from "./AllergenListHandler.js";
import PizzaTypeForm from "../formComponents/PizzaTypeForm.js";
import PizzaTypeListHandler from "./PizzaTypeListHandler.js";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js";

const RightColumn = ({ setSearchFieldChange }) => {

  const { actualClientData, setActualClientData, rightColumnType, setRightColumnType, allPizzaTypes,
    rejectedAllergens, setRejectedAllergens, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder } = useContext(MainContext);

  const [listOfOrders, setListOfOrders] = useState([]);  //total list of orders
  const [showPreOrderList, setShowPreOrderList] = useState(false) // show or not show total pre-list of orders
  const [showTopMessageBox, setShowTopMessageBox] = useState(true);
  const [actualOrderItems, setActualOrderItems] = useState([]);
  const [showOrderThanks, setShowOrderThanks] = useState(false)
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMessageThanks, setShowMessageThanks] = useState(false);
  const [updatableMessageId, setUpdatableMessageId] = useState("");
  const [updatablePizzaTypeId, setUpdatablePizzaTypeId] = useState("");
  const [newPizzaType, setNewPizzaType] = useState([]);
  const [updatableAllegenId, setUpdatableAllergenId] = useState("");
  const [newAllergen, setNewAllergen] = useState([]);
  const [updatableClientId, setUpdatableClientId] = useState("");
  const [newClient, setNewClient] = useState([]);

  return (
    <MainContext.Provider value={{
      actualClientData, setActualClientData, rightColumnType, setRightColumnType, allPizzaTypes,
      rejectedAllergens, setRejectedAllergens, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder,
      actualOrderItems, setActualOrderItems, showTopMessageBox, setShowTopMessageBox, showOrderThanks, setShowOrderThanks
    }}>

      <Context.Provider value={{
        updatableClientId, setUpdatableClientId,
        updatableAllegenId, setUpdatableAllergenId, updatablePizzaTypeId, setUpdatablePizzaTypeId,
        messageList, setMessageList, updatableMessageId, setUpdatableMessageId,
        newMessage, setNewMessage, newPizzaType, setNewPizzaType,
        newAllergen, setNewAllergen, newClient, setNewClient,
        showPreOrderList, setShowPreOrderList,
        listOfOrders, setListOfOrders, showMessageThanks, setShowMessageThanks
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
          {rightColumnType === "client-data-handler"
            ?
            <ClientListHandler />
            : <></>}
          {rightColumnType === "allergens-data-handler" ?
            <>
              <AllergenForm />
              <AllergenListHandler />
            </>
            : <></>}
          {rightColumnType === "pizza-type-data-handler" ?
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