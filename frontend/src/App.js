import './App.css'
import AllergensList from './components/listComponents/AllergensList.js'
import CenterColumn from './components/listComponents/CenterColumn.js'
import RighColumn from './components/listComponents/RightColumn.js'
import Header from './components/listComponents/Header.js'
import Footer from './components/listComponents/Footer.js'
import { MainContext } from './mainContext'
import { React, useState } from 'react'

function App() {

  const emptyClient = {
    clientName: "",
    clientId: "",
    staffStatus: false,
    bossStatus: false
  }

  const [allClientData, setAllClientData] = useState([]);
  const [actualClientData, setActualClientData] = useState(emptyClient);
  const [rightColumnType, setRightColumnType] = useState("about");
  const [allAllergens, setAllAllergens] = useState([]);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [allPizzaTypes, setAllPizzaTypes] = useState([]);
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState('');
  const [searchField, setSearchField] = useState('');

  //searchfield test
  function setSearchChange(event) {
    setSearchField(event.target.value);
    console.log(event.target.value);
  }
  if (searchField !== undefined && searchField !== "") console.log(searchField);

  return (
    <div className="main-container">
      <MainContext.Provider value={{
        actualClientData, setActualClientData, rightColumnType, setRightColumnType,
        allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
        allPizzaTypes, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder,
        allClientData, setAllClientData
      }}>
        <Header />
        <AllergensList />
        <CenterColumn />
        <RighColumn setSearchFieldChange={setSearchChange} />
      </MainContext.Provider>
      <Footer />
    </div>
  );
}

export default App 