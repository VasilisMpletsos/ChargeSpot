import React from 'react';
import Home from '../Home/Home';
import Products from '../Products/Products';
import Contact from '../Contact/Contact';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { Switch , Route , Redirect} from 'react-router-dom';

const SwitchPages = () => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/products" component={Products}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
    </Switch>
)
  
  export default SwitchPages;