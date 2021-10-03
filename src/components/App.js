import React,{useState,useRef} from 'react';
import io from 'socket.io-client'
import Login from './Login'
import Chat from './Chat'
const socket=io.connect('http://localhost:3001')

function App() {
  const [id,setID]=useState("");
  const [username,setusername]=useState("");
  const[socket1,setsocket]=useState()
  const[vari,setvar]=useState(0)
  
  return (
    <div>
       {vari===0?<Login onset={setID} username={setusername} socket1={setsocket} setvar={setvar}/>:
      <Chat socket={socket1} username={username} roomid={id}/>}
      
    </div>
    );
}

export default App;
