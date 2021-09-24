import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import Vid1 from './Assets/vid/a.mp4';
import Vid2 from './Assets/vid/b.mp4';
import Vid3 from './Assets/vid/c.mp4';
import Player from './Components/Player/player.js'

function App() {
  return (
    <React.Fragment>
    <div style={{marginLeft: "120px",marginTop: "50px", width: "1280px", height: "480px", backgroundColor:"black"}}>
    	<Player
    	 src={Vid3}
       primaryColor="#54007d"
       opacity="70"
    	/>
    </div>
    </React.Fragment>
  );
}

export default App;
