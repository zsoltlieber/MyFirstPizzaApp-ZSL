import './App.css'
import AllergenCheckList from '../src/components/AllergenCheckList/AllergenCheckList.jsx';
import PizzaTypeCards from './components/PizzaTypeTable/PizzaTypeCards.jsx';
import RightColumn from '../src/Sections/RightColumn/RightColumn.jsx';
import Header from '../src/Sections/Header/Header.jsx';
import Footer from '../src/Sections/Footer/Footer.jsx';
import ItemIsActiveStatusContextProvider from './contexts/ItemIsActiveStatusContextProvider';
import RightColumnTypeContextProvider from './contexts/RightColumnTypeContextProvider';
import ClientContextProvider from './contexts/ClientContextProvider';
import PizzaTypeContextProvider from './contexts/PizzaTypeContextProvider';
import AllergenContextProvider from './contexts/AllergenContextProvider';
import OrderContextProvider from "./contexts/OrderContextProvider";

function App() {

  return (
    <>
      <ItemIsActiveStatusContextProvider>
        <RightColumnTypeContextProvider>
          <ClientContextProvider>

            <div id="header-container" >
              <Header />
            </div>

            <AllergenContextProvider>
              <PizzaTypeContextProvider>
                <OrderContextProvider>

                  <div id="main-container">
                    <AllergenCheckList />
                    <PizzaTypeCards />
                    <RightColumn />
                  </div>

                </OrderContextProvider>
              </PizzaTypeContextProvider>
            </AllergenContextProvider>
            
          </ClientContextProvider>
        </RightColumnTypeContextProvider>
      </ItemIsActiveStatusContextProvider>

      <div id="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App 