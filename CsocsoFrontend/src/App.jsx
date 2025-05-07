import "./App.css";
import LogIn from "./pages/LogIn";
import { WelcomePage } from "./pages/WelcomePage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AboutUs } from "./pages/AboutUs";
import { Contests } from "./pages/Contests";
import CreateContest from "./pages/CreateContest";
import { SignUp } from "./pages/SingUp";
import { AddNews } from "./pages/AddNews";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
export const UserContext = createContext();

function App() {
  let [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }else{
      setCurrentUser({})
    }
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/createContest" element={<CreateContest />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/AddNews" element={<AddNews />} />
          <Route path="*" element={<WelcomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
