import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Juego from './components/Juego';

function App() {

  return (
    <div className='appFondo'>
      <div className='appCuerpo'>
        <Header />
        <Juego />
        <Footer />
      </div>
    </div>
  );
}

export default App;
