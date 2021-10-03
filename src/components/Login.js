import React,{useRef,useState} from 'react'
import {Container, Form, Button, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import io from 'socket.io-client'
import './signuppage.css'

const socket=io.connect('http://localhost:3001')


function Login(props) {
    const onref = useRef();
    const usernameRef = useRef();
    const[id,seti]=useState(onref.current)
   

    function croom(e){
        let id_present=onref.current.value
        let username_present=usernameRef.current.value
        

        if(id_present && username_present){
                e.preventDefault();
                props.onset(id_present);
                props.username(username_present)
                props.socket1(socket)
                props.setvar(1)
                
              
                
                socket.emit("join-room", {
                    username:username_present,
                     id:id_present
                    // socket:socket
                })
    }
    }
    function newid(){
        let uniqueID=uuidv4()
        uniqueID=uniqueID.substr(0,12)
        seti(uniqueID);
        props.onset(uniqueID)
        props.username(usernameRef.current.value)
    }    
    return (
        // <Container>
        //     <Form style={{height:"100vh"}} className="d-flex align-items-center justify-content-center flex-column">
        //         <FormGroup>
                    
        //             <FormControl placeholder="Room Name" value={id} ref={onref}className="mb-2" type="text"></FormControl>
        //             <FormControl placeholder="Username"  ref={usernameRef}className="mb-2" type="text"></FormControl>
        //             <Button  onClick={croom} variant="primary" type="submit">Create Room</Button> 
        //             <Button  onClick={newid}className="m-2" variant="success">Create ID</Button>
        //         </FormGroup>
                    
        //     </Form>
        // </Container>
        <div className="container">
            <div className="outer-box">
                <form className="inner-box">
                    
                        <h1>Login</h1>
                        <input type="text" value={id} ref={onref} placeholder="Room Name"></input>
                        <input type="text" placeholder="Username" ref={usernameRef}></input>
                        <div className="buttonContainer">
                            <input onClick={croom} type="submit" value="Submit"></input>
                            <input onClick={newid} type="button" value="Create ID"></input>
                        </div>

                    
                </form>
            </div>
        </div>
    )
}

export default Login
