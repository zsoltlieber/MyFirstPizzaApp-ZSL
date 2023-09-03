import './App.css'
import AllergenCheckList from '../src/Pages/Lists/AllergenCheckList';
import CenterColumn from '../src/Pages/Lists/CenterColumn';
import RightColumn from '../src/Pages/Lists/RightColumn';
import Header from '../src/Pages/Lists/Header';
import Footer from '../src/Pages/Lists/Footer';
import { MainContext } from './mainContext.js'
import { React, useState } from 'react'

function App() {
  const [actualClientData, setActualClientData] = useState({});
  const [allClientData, setAllClientData] = useState([]);
  const [allAllergens, setAllAllergens] = useState([]);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [allPizzaTypes, setAllPizzaTypes] = useState([]);
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState('');
  const [rightColumnType, setRightColumnType] = useState("about");
  const [itemIsActiveStatus, setItemIsActiveStatus] = useState(true) 

  //searchfield for trying this component ability
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
        rightColumnType, setRightColumnType, itemIsActiveStatus, setItemIsActiveStatus
      }}>
        <div id="header-container" >
          <Header />
        </div>
        <div id="main-container">
          <AllergenCheckList />
          <CenterColumn />
          <RightColumn setSearchFieldChange={setSearchChange} />
        </div>
      </MainContext.Provider>
      <div id="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App 