import './App.css'
import AllergensList from './components/listComponents/AllergensList.js'
import CenterColumn from './components/listComponents/CenterColumn.js'
import RighColumn from './components/listComponents/RightColumn.js'
import Header from './components/listComponents/Header.js'
import Footer from './components/listComponents/Footer.js'
import { useEffect, useState } from 'react'

function App() {

  const [rightColumnType, setRightColumnType] = useState("about");
  const [logOutClient, setLogoutClient] = useState(true);
  const [showOrderList, setShowOrderList] = useState(false);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [allPizzaTypes, setAllPizzaTypes] = useState([]);
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState('');
  const [searchField, setSearchField] = useState('');

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

  function setRightColumnTypeText(nextPage) {
    console.log(nextPage);
    setRightColumnType(nextPage)
  }


  function setLogoutClientData(value) {
    setLogoutClient(value)
  }
  //searchfield test
  function setSearchChange(event) {
    setSearchField(event.target.value)
  }
  if (searchField !== "") console.log(searchField)

  return (
    <div className="main-container">
      < Header setRightColumnTypeData={setRightColumnType} logoutClientSet={logOutClient}
        setClientLogout={setLogoutClientData} actualClientSet={actualClientData} showOrderListSet={showOrderList} />
      <AllergensList setRejectedAllergens={setRejectedAllergens} />
      <CenterColumn rejectedAllergensSet={rejectedAllergens} setAllPizzaTypesData={setAllPizzaTypes}
        setActualPizzaIdToOrder={setPizzaIdToOrder} />
      <RighColumn setRightColumnTypeData={setRightColumnTypeText} rightColumnTypeSet={rightColumnType}
        actualClientSet={actualClientData} setLogoutClientData={setLogoutClient} setActualClientData={setActualClientData}
        pizzaTypesDataSet={allPizzaTypes} actualOrderedPizzaIdDataSet={pizzaIdToOrder} setActualPizzaIdEmpty={setPizzaIdToOrder}
        setShowOrderListData={setShowOrderList} setSearchFieldChange={setSearchChange} />
      <Footer />
    </div>
  );
}

export default App;
