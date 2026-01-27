import "./App.css";
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";
import Footer from "./Components/Footer";
import Tools from "./Components/Tools/Tools";
import Notepad from "./Components/Notepad/Notepad";
import Navbar from "./Components/Navbar";
import ColorPicker from "./Components/ColorPicker";
import RegexTester from "./Components/RegexTester";
import Calender from "./Components/TaskManager/Calender";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<><Navbar /><Notepad /></>} />
          <Route path="/colorpicker" element={<><Navbar /><ColorPicker /></>} />
          <Route path="/regex" element={<><Navbar /><RegexTester /></>} />
          <Route path="/calender" element={<><Navbar /><Calender/></>} />
          <Route path="/tools" element={<><Navbar /><Tools /></>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
      <Footer />
    </>
  );
}

export default App;
