import "./App.css";
import LogInSignUp from "./pages/LogInSignUp";
import { WelcomePage } from "./pages/WelcomePage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AboutUs } from "./pages/AboutUs";
import {Contests} from "./pages/Contests";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LogInSignUp />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contests" element={<Contests/>}/>
        <Route path="*" element={<WelcomePage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
