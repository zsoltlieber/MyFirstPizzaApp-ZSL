import './App.css'
import AllergensList from './components/listComponents/AllergensList.js'
import PizzaTypeColumn from './components/listComponents/PizzaTypeColumn.js'
import RighColumn from './components/listComponents/RightColumn.js'
import Header from './components/listComponents/Header.js'
import Footer from './components/listComponents/Footer.js'
import { useEffect, useState } from 'react'

function App() {

  const [rightColumnContent, setRightColumnType] = useState("about");
  const [logOutClient, setLogoutClient] = useState(true);
  const [showOrderList, setShowOrderList] = useState(false);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [allPizzaTypes, setAllPizzaTypes] = useState({});
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState("")

  const emptyClient = {
    clientName: "",
    clientId: "",
    staffStatus: false,
    bossStatus: false
  }

  const [actualClientData, setActualClientData] = useState(emptyClient);

  useEffect(() => {
    if (logOutClient === true) {
      setActualClientData(emptyClient)
    }
  }, [logOutClient])

  return (
    <div className="main-container">
      < Header setRightColumnTypeData={setRightColumnType} logoutClientSet={logOutClient}
        setClientLogout={setLogoutClient} actualClientSet={actualClientData} showOrderListSet={showOrderList} />
      <AllergensList setRejectedAllergens={setRejectedAllergens} />
      <PizzaTypeColumn rejectedAllergensSet={rejectedAllergens} setAllPizzaTypesData={setAllPizzaTypes}
        setActualPizzaIdToOrder={setPizzaIdToOrder} />
      <RighColumn setRightColumnTypeData={setRightColumnType} rightColumnTypeSet={rightColumnContent}
        actualClientSet={actualClientData} setLogoutClientData={setLogoutClient} setActualClientData={setActualClientData}
        pizzaTypesDataSet={allPizzaTypes} actualOrderedPizzaIdDataSet={pizzaIdToOrder} setActualPizzaIdEmpty={setPizzaIdToOrder} setShowOrderListData={setShowOrderList} />
      <Footer />
    </div>
  );
}

export default App;
