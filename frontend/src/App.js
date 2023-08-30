import './App.css'
import AllergenCheckList from './components/listComponents/AllergenCheckList.js'
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

  const [actualClientData, setActualClientData] = useState(emptyClient);
  const [allClientData, setAllClientData] = useState([]);
  const [allAllergens, setAllAllergens] = useState([]);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [allPizzaTypes, setAllPizzaTypes] = useState([]);
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState('');
  const [rightColumnType, setRightColumnType] = useState("about");

  //searchfield test
  const [searchField, setSearchField] = useState('');

  function setSearchChange(event) {
    setSearchField(event.target.value);
    console.log(event.target.value);
  }
  if (searchField !== undefined && searchField !== "") console.log(searchField);

  return (
    <>
      <MainContext.Provider value={{
        actualClientData, setActualClientData, allClientData, setAllClientData,
        allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
        allPizzaTypes, setAllPizzaTypes, pizzaIdToOrder, setPizzaIdToOrder,
        rightColumnType, setRightColumnType,
      }}>
        <div id="header-container" >
          <Header />
        </div>
        <div id="main-container">
          <AllergenCheckList />
          <CenterColumn />
          <RighColumn setSearchFieldChange={setSearchChange} />
        </div>
      </MainContext.Provider>
      <div id="footer-container">
      <Footer  />
      </div>
    </>
  );
}

export default App 