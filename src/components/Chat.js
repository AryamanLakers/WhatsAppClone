import React,{useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
// import { Socket } from 'socket.io-client';
import ScrollToBottom from "react-scroll-to-bottom"
import './styles.css'
function Chat(props) {
    
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList,setmessageList]=useState([])
    const sendMessage= async ()=>{
        
        const time=new Date()
        let temp=time.getHours()+":" +time.getMinutes()
        if(currentMessage!==""){
            const message={
                username:props.username,
                id:props.roomid,
                content:currentMessage,
                time:temp
            };
           
            await props.socket.emit('send-message',message)
            setmessageList((prev)=>[...prev,message])
            setCurrentMessage("")
        }
    }
    useEffect(()=>{
        props.socket.on("receive-message",(matter)=>{
            setmessageList((prev)=>[...prev,matter])
        })
    },[props.socket])
    
    return (
        <div className="container">
            <div className="chat-window" >
                <div className="chat-header">
                    <p>Live Chat</p>
                </div>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                                    {messageList.map((message)=>{
                                    return  (
                                        <div className="message" id={message.username===props.username?"you":"other"}>
                                            <div>
                                            <div className="message-content" >
                                                    <p>{message.content}</p>
                                            </div>
                                            <div className="message-meta" >
                                                    <p id="time">{message.time}</p>
                                                    <p id="author">{message.username}</p>

                                            </div>
                                            </div>
                                        </div>

                                    )
                                    })}
                    </ScrollToBottom>
                </div>
                <footer className="chat-footer">
                                <input
                                    className="input-class"
                                    type="text"
                                    value={currentMessage}
                                    placeholder="Type...."
                                    onChange={(event) => {
                                        setCurrentMessage(event.target.value);
                                    }}
                                    onKeyPress={(event)=>{event.key==="Enter" && sendMessage()}}
                                    />
                                    <button onClick={sendMessage}>&#9658;</button>
                </footer> 
            </div>
        </div>
        
        // <div style={{height:"100vh"}} className="d-flex align-items-center justify-content-center">   
        //     <Card style={{height:"80vh",width:"50%"}} className="d-flex align-items-center flex-column pb-2 ">
        //         <Card.Header >Chat Bot</Card.Header>
        //         <Card.Body style={{height:"100%",width:"100%"}}>
        //             <Card.Text style={{height:"100%"}}>
        //                 <div style={{height:"95%"}}className="chat-body" >
        //                     <ScrollToBottom className="message-container">
        //                     {messageList.map((message)=>{
        //                        return  (
        //                            <div className="message" id={message.username===props.username?"you":"other"}>
        //                                <div>
        //                                <div className="message-content" >
        //                                     <p>{message.content}</p>
        //                                </div>
        //                                <div className="message-meta" >
        //                                     <p id="time">{message.time}</p>
        //                                     <p id="author">{message.username}</p>

        //                                </div>
        //                                </div>
        //                            </div>

        //                        )
        //                     })}
        //                     </ScrollToBottom>
        //                 </div>  
        //                 <footer className="chat-footer">
        //                     <input
        //                         className="input-class"
        //                         type="text"
        //                         value={currentMessage}
        //                         placeholder="Type...."
        //                         onChange={(event) => {
        //                             setCurrentMessage(event.target.value);
        //                         }}
        //                         onKeyPress={(event)=>{event.key==="Enter" && sendMessage()}}
        //                         />
        //                         <button onClick={sendMessage}>&#9658;</button>
        //                 </footer>
        //             </Card.Text>
        //         </Card.Body>
        //     </Card>
        // </div>

    )
}

export default Chat
{/* <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
    <div className="chat-body"></div>  
    </div>
    <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type...."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          
        />
        <button onClick={sendMessage}>&#9658;</button>
    </div> */}