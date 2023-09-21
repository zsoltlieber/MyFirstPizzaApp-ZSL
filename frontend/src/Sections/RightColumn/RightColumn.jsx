import { useRightColumnType } from "../../contexts/RightColumnTypeContextProvider";

import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import OrderForm from "../../components/OrderForm/OrderForm.jsx";
import OrderTable from "../../components/OrderTable/OrderTable.jsx";
import MessageForm from "../../components/MessageForm/MessageForm.jsx";
import MessageTable from "../../components/MessageTable/MessageTable.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";
import BossPage from "../BossPage/BossPage.jsx";
import StaffPage from "../StaffPage/StaffPage.jsx";
import ClientForm from "../../components/ClientForm/ClientForm.jsx";
import ClientTable from "../../components/ClientTable/ClientTable.jsx";
import AllergenForm from "../../components/AllergenForm/AllergenForm.jsx";
import AllergenListHandler from "../../components/AllergenTable/AllergenTable.jsx";
import PizzaTypeForm from "../../components/PizzaTypeForm/PizzaTypeForm.jsx"
import PizzaTypeTable from "../../components/PizzaTypeTable/PizzaTypeTable.jsx";
import MessageContextProvider from "../../contexts/MessageContextProvider";

const RightColumn = ({ setSearchFieldChange }) => {
  const { rightColumnType } = useRightColumnType()

  return (
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
          <OrderTable />
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
          <ClientTable />
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
  )
}

export default RightColumn