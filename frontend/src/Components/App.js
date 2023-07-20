import '../Styles/App.css';
import Navbar from './Navbar';
import Allergens from './Allergens';
import Footer from './Footer';
import PizzaTypes from './PizzaTypes';
import RightContainer from './RightContainer';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Allergens />
        <PizzaTypes />
        <RightContainer />
        <Footer />
      </div>
    </>
  );
}

export default App;
