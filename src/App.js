import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./app/components/Navigation";
import Country from "./app/pages/MapView";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/:countryCode">
            <Country />
          </Route>
          <Route path="/">
            <Country />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;

const Search = () => {
  return <h2>search</h2>;
};
