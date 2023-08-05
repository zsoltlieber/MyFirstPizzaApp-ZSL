import './App.css'
import AllergenList from './components/AllergenList.js'
import CenterColumn from './components/PizzaTypeColumn.js'
import RighColumn from './components/RightColumn.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'

function App() {


  return (
    <div className="main-container">
      <Header />
      <AllergenList />
      <CenterColumn />
      <RighColumn />
      <Footer />
    </div>
  );
}

export default App;
