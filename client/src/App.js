import "./pages/css/App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Languages from "./pages/Languages";
import Art from "./pages/Art";
import Dance from "./pages/Dance";
import Food from "./pages/Food";
import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { menuOutline, closeOutline } from "ionicons/icons";

function App() {
  // MOBILE NAVIGATION
  const [isNavOpen, setNavOpen] = useState(false);

  const handleToggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const navIcon = () => {
    if (isNavOpen) {
      return (
        <IonIcon
          aria-label="mobile navigation button"
          icon={closeOutline}
          className="icon-mobile-nav fixed"
        />
      );
    } else {
      return (
        <IonIcon
          aria-label="mobile navigation button"
          icon={menuOutline}
          className="icon-mobile-nav"
        />
      );
    }
  };

  return (
    <nav className="App">
      <Router>
        <header className={`${isNavOpen ? "margin" : ""}`}>
          <button
            className={`btn-mobile-nav ${isNavOpen ? "" : ""}`}
            onClick={handleToggleNav}
          >
            {navIcon()}
          </button>
          <div className={`helper ${isNavOpen ? "opacity" : ""}`}>
            <div className="header">
              <div className="header-left">
                <Link to="/home" className="btn-left" onClick={handleToggleNav}>
                  Home
                </Link>
                <Link to="/art" className="btn-left" onClick={handleToggleNav}>
                  Art
                </Link>
                <Link
                  to="/dance"
                  className="btn-left"
                  onClick={handleToggleNav}
                >
                  Dance
                </Link>
                <Link
                  to="/language"
                  className="btn-left"
                  onClick={handleToggleNav}
                >
                  Language
                </Link>
                <Link to="/food" className="btn-left" onClick={handleToggleNav}>
                  Food
                </Link>
              </div>
              <div className="header-right">
                <Link
                  to="/signup"
                  className="btn-right"
                  onClick={handleToggleNav}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn-right"
                  onClick={handleToggleNav}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </header>
        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path="/home" exact Component={Home}></Route>
          <Route path="/login" exact Component={Login}></Route>
          <Route path="/signup" exact Component={SignUp}></Route>
          <Route path="/art" exact Component={Art}></Route>
          <Route path="/dance" exact Component={Dance}></Route>
          <Route path="/language" exact Component={Languages}></Route>
          <Route path="/food" exact Component={Food}></Route>
        </Routes>
      </Router>
    </nav>
  );
}

export default App;
