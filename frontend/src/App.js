import './App.css'
import AllergensList from './components/listComponents/AllergensList.js'
import PizzaTypeColumn from './components/listComponents/PizzaTypeColumn.js'
import RighColumn from './components/listComponents/RightColumn.js'
import Header from './components/listComponents/Header.js'
import Footer from './components/listComponents/Footer.js'
import { useState } from 'react'

function App() {

  const [rightColumnContent, setRightColumnType] = useState("about");
  const [showOrderList, setShowOrderList] = useState(false);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [allPizzaTypes, setAllPizzaTypes] = useState({});
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState()

  const emptyClient = {
    clientName: "",
    clientId: "",
    staffStatus: false,
    bossStatus: false
  }
  
  const [actualClientData, setActualClientData] = useState(emptyClient);

  const setAllergens = (allergens) => {
    setRejectedAllergens(allergens);
  }

  const setActualClient = (clientData) => {
    setActualClientData(clientData);
  }

  const setRightColumnContentType = (content) => {
    setRightColumnType(content);
  }

  const setAllPizzas = (pizzas) => {
    setAllPizzaTypes(pizzas);
  }

  const setActualOrderedPizzaId = (orderePizzaId) => {
    setPizzaIdToOrder(orderePizzaId);
  }

  const setShowOrders = (isShown) => {
    setShowOrderList(isShown)
  }

  return (
    <div className="main-container">
      <Header setRightColumnTypeData={setRightColumnContentType} setActualClientData={setActualClient}
        actualClientSet={actualClientData} showOrderListSet={showOrderList} />
      <AllergensList setRejectedAllergens={setAllergens} />
      <div id='mobile-format'>
        <PizzaTypeColumn rejectedAllergensSet={rejectedAllergens} setAllPizzaTypes={setAllPizzas} setActualPizzaIdToOrder={setActualOrderedPizzaId} />
        <RighColumn setRightColumnTypeData={setRightColumnContentType} rightColumnTypeSet={rightColumnContent} actualClientSet={actualClientData}
          setActualClientData={setActualClient} pizzaTypesDataSet={allPizzaTypes} actualOrderedPizzaId={pizzaIdToOrder} setShowOrderListData={setShowOrders } />
      </div>
      <Footer />
    </div>
  );
}

export default App;
