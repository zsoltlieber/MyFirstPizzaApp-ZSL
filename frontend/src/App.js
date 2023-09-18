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
  const [newOrModifiedPizzaType, setNewOrModifiedPizzaType] = useState([]);
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState('');
  const [rightColumnType, setRightColumnType] = useState("about");
  const [itemIsActiveStatus, setItemIsActiveStatus] = useState(true)

  return (
    <>
      <MainContext.Provider value={{
        actualClientData, setActualClientData, allClientData, setAllClientData,
        allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
        allPizzaTypes, setAllPizzaTypes, newOrModifiedPizzaType, setNewOrModifiedPizzaType,
        pizzaIdToOrder, setPizzaIdToOrder,
        rightColumnType, setRightColumnType, itemIsActiveStatus, setItemIsActiveStatus
      }}>
        <div id="header-container" >
          <Header />
        </div>
        <div id="main-container">
          <AllergenCheckList />
          <CenterColumn />
          <RightColumn />
        </div>
      </MainContext.Provider>
      <div id="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App 