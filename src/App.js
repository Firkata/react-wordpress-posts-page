import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Post from "./components/Post";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/post/:id" component={Post} />
    </Switch>
  );
};

export default App;
