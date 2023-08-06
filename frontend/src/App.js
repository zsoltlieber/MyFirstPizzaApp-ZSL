import './App.css'
import AllergensList from './components/listComponents/AllergensList.js'
import CenterColumn from './components/listComponents/PizzaTypeColumn.js'
import RighColumn from './components/mainPageBoxComponents/RightColumn.js'
import Header from './components/listComponents/Header.js'
import Footer from './components/listComponents/Footer.js'
import { useState } from 'react'

function App() {

  const [rightBlock, setRightBlock] = useState("about");
  const [rejectedAllergens, setRejectedAllergens] = useState([]);

  const setRightBlockForm = (formId) => {
    setRightBlock(formId);
  }

  const setAllergens = (allergens) => {
    setRejectedAllergens(allergens);
  }

  return (
    <div className="main-container">
      <Header setRightBlock={setRightBlockForm} />
      <AllergensList rejectedAllergens={setAllergens} />
      <CenterColumn allergensSet={rejectedAllergens} />
      <RighColumn rightBlockSet={rightBlock} />
      <Footer />
    </div>
  );
}

export default App;
