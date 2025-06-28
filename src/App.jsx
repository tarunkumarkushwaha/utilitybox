import "./App.css";
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";
import Calculator from "./Components/Calculator";
import Footer from "./Components/Footer";
import Todo from "./Components/TaskManager/Todo";
import Tools from "./Components/Tools/Tools";
import Notepad from "./Components/Notepad/Notepad";
import AlarmClock from "./Components/AlarmClock";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<><Navbar /><Notepad /></>} />
          <Route path="/calculator" element={<><Navbar /><Calculator /></>} />
          <Route path="/todo" element={<><Navbar /><Todo /></>} />
          <Route path="/alarmclock" element={<><Navbar /><AlarmClock /></>} />
          <Route path="/tools" element={<><Navbar /><Tools /></>} />
        </Routes>
      </HashRouter>
      <Footer />
    </>
  );
}

export default App;
