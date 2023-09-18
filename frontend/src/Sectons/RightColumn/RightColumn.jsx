import { useState, useContext } from "react";
import LoginForm from "../../Pages/Forms/LoginForm";
import RegistrationForm from "../../Pages/Forms/RegistrationForm";
import OrderForm from "../../Pages/Forms/OrderForm";
import OrderListHandler from "../../Pages/Lists/OrderListHandler.jsx";
import MessageForm from "../../components/MessageForm/MessageForm.jsx";
import MessageTable from "../../components/MessageTable/MessageTableController.jsx";
import AboutUs from "./AboutUs.jsx";
import BossPage from "../BossPage/BossPage.jsx";
import StaffPage from "./StaffPage.jsx";
import ClientForm from "../../Pages/Forms/ClientForm";
import ClientListHandler from "../../Pages/Lists/ClientListHandler.jsx";
import AllergenForm from "../../Pages/Forms/AllergenForm";
import AllergenListHandler from "../../Pages/Lists/AllergenListHandler.jsx";
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

  const emptyClient = {
    clientName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: [{
      postCode: "",
      city: "",
      streetAndNumber: "",
      otherInfo: ""
    }],
    isActive: "",
    isAdmin: "",
    isMainAdmin: "",
  };


  const [newOrModifiedClient, setNewOrModifiedClient] = useState(emptyClient);
  const [updatableClientId, setUpdatableClientId] = useState("");
  const [newOrModifiedAllergen, setNewOrModifiedAllergen] = useState("");
  const [updatableAllergenId, setUpdatableAllergenId] = useState("");
  const [listOfOrders, setListOfOrders] = useState([]);
  const [preOrderList, setPreOrderList] = useState([]);
  const [showOrderThanks, setShowOrderThanks] = useState(false)
  const [messageList, setMessageList] = useState([]);
  const [newOrModifiedMessage, setNewOrModifiedMessage] = useState([]);
  const [originalMessage, setOriginalMessage] = useState("");
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
        messageList, setMessageList, newOrModifiedMessage, setNewOrModifiedMessage,
        originalMessage, setOriginalMessage, showOrderThanks, setShowOrderThanks,
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