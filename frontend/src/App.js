import Header from './components/Header.js'
import Footer from './components/Footer.js'
import MainContainer from './components/MainContainer.js';
import './App.css'


function App() {
  return (
    <div className="container">
      <Header title="Fő oldal props" />
      <MainContainer/>
      <Footer/>
    </div>
  );
}

export default App;
