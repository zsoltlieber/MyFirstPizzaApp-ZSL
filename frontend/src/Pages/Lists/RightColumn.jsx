import { useState, useContext } from "react";
import LoginForm from "../Forms/LoginForm";
import RegistrationForm from "../Forms/RegistrationForm";
import OrderForm from "../Forms/OrderForm";
import OrderListHandler from "./OrderListHandler.jsx";
import MessageForm from "../../components/MessageForm/MessageForm.jsx";
import MessageTable from "../../components/MessageTable/MessageTableController.jsx";
import AboutUs from "./AboutUs.jsx";
import BossPage from "./BossPage.jsx";
import StaffPage from "./StaffPage.jsx";
import ClientForm from "../Forms/ClientForm";
import ClientListHandler from "./ClientListHandler.jsx";
import AllergenForm from "../Forms/AllergenForm";
import AllergenListHandler from "./AllergenListHandler.jsx";
import PizzaTypeForm from "../../components/PizzaTypeForm/PizzaTypeForm.jsx"
import PizzaTypeTable from "../../components/PizzaTypeTable/PizzaTypeTableController.jsx";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js";

const RightColumn = ({ setSearchFieldChange }) => {

  const {
    actualClientData, setActualClientData, allClientData, setAllClientData,
    allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
    allPizzaTypes, setAllPizzaTypes, newOrModifiedPizzaType, setNewOrModifiedPizzaType,
    pizzaIdToOrder, setPizzaIdToOrder,
    rightColumnType, setRightColumnType, itemIsActiveStatus, setItemIsActiveStatus
  } = useContext(MainContext);

  const [newOrModifiedClient, setNewOrModifiedClient] = useState([]); //for new and updatable client
  const [updatableClientId, setUpdatableClientId] = useState("");
  const [newOrModifiedAllergen, setNewOrModifiedAllergen] = useState("");//for new and updatable allergen
  const [updatableAllergenId, setUpdatableAllergenId] = useState("");
  const [listOfOrders, setListOfOrders] = useState([]);  //total list of orders
  const [preOrderList, setPreOrderList] = useState([]);
  const [showOrderThanks, setShowOrderThanks] = useState(false)
  const [messageList, setMessageList] = useState([]);
  const [newOrModifiedMessage, setNewOrModifiedMessage] = useState([]);
  const [showMessageThanks, setShowMessageThanks] = useState(false);
  const [showTopMessageBox, setShowTopMessageBox] = useState(true);

  return (
    <MainContext.Provider value={{
      actualClientData, setActualClientData, allClientData, setAllClientData,
      allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
      allPizzaTypes, setAllPizzaTypes, newOrModifiedPizzaType, setNewOrModifiedPizzaType, pizzaIdToOrder, setPizzaIdToOrder,
      rightColumnType, setRightColumnType, itemIsActiveStatus, setItemIsActiveStatus
    }}>
      <Context.Provider value={{
        newOrModifiedClient, setNewOrModifiedClient, updatableClientId, setUpdatableClientId,
        newOrModifiedAllergen, setNewOrModifiedAllergen, updatableAllergenId, setUpdatableAllergenId,
        preOrderList, setPreOrderList, listOfOrders, setListOfOrders,
        messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage, showOrderThanks, setShowOrderThanks,
        showMessageThanks, setShowMessageThanks, showTopMessageBox, setShowTopMessageBox
      }}>
        <div id='right-column'>
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
              <MessageTable />
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
              <PizzaTypeTable />
            </>
            : <></>
          }
        </div>
      </Context.Provider>
    </MainContext.Provider>
  )
}

export default RightColumn