import './App.css'
import AllergenList from './components/AllergenList.js'
import CenterColumn from './components/PizzaTypeColumn.js'
import RighColumn from './components/RightColumn.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import { useState } from 'react'

function App() {

  const [rightBlock, setRightBlock] = useState("about")


  const setRightBlockForm = (childdata) => {
    setRightBlock(childdata);
  }

  return (
    <div className="main-container">
      <Header setRightBlockForm={setRightBlockForm } />
      <AllergenList />
      <CenterColumn />
      <RighColumn rightBlock={rightBlock} />
      <Footer />
    </div>
  );
}

export default App;
