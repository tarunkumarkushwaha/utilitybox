import "./App.css";
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";
import Calculator from "./Components/Calculator";
import Footer from "./Components/Footer";
import Todo from "./Components/TaskManager/Todo";
import Tools from "./Components/Tools";
import Notepad from "./Components/Notepad/Notepad";
import AlarmClock from "./Components/AlarmClock";
import CurrencyConverter from "./Components/CurrencyConverter";
import WeatherWidget from "./Components/WeatherWidget";
import Dictionary from "./Components/Dictionary";
import Navbar from "./Components/Navbar";
import ImageSearch from "./Components/ImageSearch";
import ClipboardManager from "./Components/ClipboardManager";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<><Navbar /><Notepad /></>} />
          <Route path="/calculator" element={<><Navbar /><Calculator /></>} />
          <Route path="/todo" element={<><Navbar /><Todo /></>} />
          <Route path="/imagesearch" element={<><Navbar /><ImageSearch/></>} />
          <Route path="/alarmclock" element={<><Navbar /><AlarmClock /></>} />
          <Route path="/currencyconverter" element={<><Navbar /><CurrencyConverter /></>} />
          <Route path="/weather" element={<><Navbar /><WeatherWidget /></>} />
          <Route path="/dictionary" element={<><Navbar /><Dictionary /></>} />
          <Route path="/tools" element={<><Navbar /><Tools /></>} />
          <Route path="/clipboard" element={<><Navbar /><ClipboardManager/></>} />
        </Routes>
      </HashRouter>
      <Footer />
    </>
  );
}

export default App;
