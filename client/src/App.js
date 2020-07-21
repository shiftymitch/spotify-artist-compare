import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx"
import Footer from "./components/Footer.jsx"
import Compare from './components/Compare.jsx';
import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
        <Switch>
          <Route exact path="/" component={Compare} />
        </Switch>
      <Footer />
    </Router>
  );
}


export default App;
