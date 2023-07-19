import '../Styles/App.css';
import Navbar from './Navbar';
import Allergens from './Allergens';
import Footer from './Footer';
import PizzaTypes from './PizzaTypes';
import Login from './Login';
import Messages from './Messages';


function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Allergens />
        <PizzaTypes />
        <Login />
        <Messages />
        <Footer />
      </div>
    </>
  );
}

export default App;
