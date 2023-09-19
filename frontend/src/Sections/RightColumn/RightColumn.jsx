import { useState, useContext } from "react";
import LoginForm from "../../Pages/Forms/LoginForm";
import RegistrationForm from "../../Pages/Forms/RegistrationForm";
import OrderForm from "../../Pages/Forms/OrderForm";
import OrderListHandler from "../../Pages/Lists/OrderListHandler.jsx";
import MessageForm from "../../components/MessageForm/MessageForm.jsx";
import MessageTable from "../../components/MessageTable/MessageTableController.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";
import BossPage from "../BossPage/BossPage.jsx";
import StaffPage from "../StaffPage/StaffPage.jsx";
import ClientForm from "../../Pages/Forms/ClientForm";
import ClientListHandler from "../../Pages/Lists/ClientListHandler.jsx";
import AllergenForm from "../../Pages/Forms/AllergenForm";
import AllergenListHandler from "../../Pages/Lists/AllergenListHandler.jsx";
import PizzaTypeForm from "../../components/PizzaTypeForm/PizzaTypeForm.jsx"
import PizzaTypeTable from "../../components/PizzaTypeTable/PizzaTypeTableController.jsx";
import { MainContext } from "../../mainContext.js";
import { Context } from "../../context.js";
import { useRightColumnType } from "../../contexts/RightColumnTypeContextProvider";
import MessageContextProvider from "../../contexts/MessageContextProvider";

const RightColumn = ({ setSearchFieldChange }) => {

  const {
    allClientData, setAllClientData,
    allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
    allPizzaTypes, setAllPizzaTypes, newOrModifiedPizzaType, setNewOrModifiedPizzaType,
    pizzaIdToOrder, setPizzaIdToOrder,
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
  const [newOrModifiedMessage, setNewOrModifiedMessage] = useState([]);
  const [originalMessage, setOriginalMessage] = useState("");

  const { rightColumnType } = useRightColumnType()

  return (

    <MainContext.Provider value={{
      allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
      allPizzaTypes, setAllPizzaTypes, newOrModifiedPizzaType, setNewOrModifiedPizzaType, pizzaIdToOrder, setPizzaIdToOrder,
    }}>
      <Context.Provider value={{
        newOrModifiedAllergen, setNewOrModifiedAllergen, updatableAllergenId, setUpdatableAllergenId,
        preOrderList, setPreOrderList, listOfOrders, setListOfOrders,
        newOrModifiedMessage, setNewOrModifiedMessage,
        originalMessage, setOriginalMessage, showOrderThanks, setShowOrderThanks,
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
              <MessageContextProvider>
                <MessageForm />
                <MessageTable />
              </MessageContextProvider>
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