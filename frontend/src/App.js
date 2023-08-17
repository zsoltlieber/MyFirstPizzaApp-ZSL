import './App.css'
import AllergensList from './components/listComponents/AllergensList.js'
import PizzaTypeColumn from './components/listComponents/PizzaTypeColumn.js'
import RighColumn from './components/mainPageBoxComponents/RightColumn.js'
import Header from './components/listComponents/Header.js'
import Footer from './components/listComponents/Footer.js'
import { useState } from 'react'

function App() {

  const [rightBlockData, setRightBlockData] = useState("about");
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [actualClientData, setActualClientData] = useState({ clientName: "", clientId: "", staffStatus: false, bossStatus: false });

  const setActualClient = (clientData) => {
    setActualClientData(clientData);
  }

  const setRightBlock = (formId) => {
    setRightBlockData(formId);
  }

  const setAllergens = (allergens) => {
    setRejectedAllergens(allergens);
  }


  return (
    <div className="main-container">
      <Header setRightBlock={setRightBlock} rightBlockSet={rightBlockData} setActualClientData={setActualClient} actualClientSet={actualClientData} />
      <AllergensList setRejectedAllergens={setAllergens} />
      <div id='mobile-format'>
        <PizzaTypeColumn rejectedAllergensSet={rejectedAllergens} />
        <RighColumn setRightBlock={setRightBlock} rightBlockSet={rightBlockData} actualClientSet={actualClientData} setActualClientData={setActualClient} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
