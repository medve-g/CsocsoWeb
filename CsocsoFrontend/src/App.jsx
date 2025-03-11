import "./App.css";
import LogInSignUp from "./pages/LogInSignUp";
import { WelcomePage } from "./pages/WelcomePage";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LogInSignUp />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
