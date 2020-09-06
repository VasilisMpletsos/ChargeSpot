import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SwitchPages from '../../components/SwitchPages/SwitchPages';

const Layout = (props) => (
      <div >
        <NavBar darkMode={props.darkMode}/>
        <SwitchPages/>
      </div>
)
  
  export default Layout;