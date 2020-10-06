import React from "react";
import Home from "../Home/Home";
import Products from "../Products/Products";
import Contact from "../Contact/Contact";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Switch, Route } from "react-router-dom";

const SwitchPages = () => (
  <Switch>
    <Route exact path='/' exact component={Home} />
    <Route exact path='/products' component={Products} />}
    <Route exact path='/contact' component={Contact} />
    <Route exact path='/signup' component={Signup} />
    <Route exact path='/login' component={Login} />
  </Switch>
);

export default SwitchPages;
