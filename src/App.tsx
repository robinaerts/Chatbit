import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Application from './Components/Application';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/app" element={<Application/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
