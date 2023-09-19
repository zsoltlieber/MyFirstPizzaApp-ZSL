import './App.css'
import AllergenCheckList from '../src/Pages/Lists/AllergenCheckList';
import CenterColumn from '../src/Pages/Lists/CenterColumn';
import RightColumn from '../src/Sections/RightColumn/RightColumn.jsx';
import Header from '../src/Sections/Header/Header.jsx';
import Footer from '../src/Sections/Footer/Footer.jsx';
import { MainContext } from './mainContext.js'
import { React, useState } from 'react'
import ItemIsActiveStatusContextProvider from './contexts/ItemIsActiveStatusContextProvider';
import RightColumnContextProvider from './contexts/RightColumnContextProvider';

function App() {
  const [actualClientData, setActualClientData] = useState({});
  const [allClientData, setAllClientData] = useState([]);
  const [allAllergens, setAllAllergens] = useState([]);
  const [rejectedAllergens, setRejectedAllergens] = useState([]);
  const [allPizzaTypes, setAllPizzaTypes] = useState([]);
  const [newOrModifiedPizzaType, setNewOrModifiedPizzaType] = useState([]);
  const [pizzaIdToOrder, setPizzaIdToOrder] = useState('');

  return (
    <>
      <ItemIsActiveStatusContextProvider>
        <RightColumnContextProvider>

          <MainContext.Provider value={{
            actualClientData, setActualClientData, allClientData, setAllClientData,
            allAllergens, setAllAllergens, rejectedAllergens, setRejectedAllergens,
            allPizzaTypes, setAllPizzaTypes, newOrModifiedPizzaType, setNewOrModifiedPizzaType,
            pizzaIdToOrder, setPizzaIdToOrder
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
        </RightColumnContextProvider>
      </ItemIsActiveStatusContextProvider>
      <div id="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App 