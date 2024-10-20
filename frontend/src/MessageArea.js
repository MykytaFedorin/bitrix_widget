import './MessageArea.css';
import MessageLink from './MessageLink';
import Message from './Message.js';


function MessageArea({message}){
    console.log("MessageArea.js");
    let messageBlock = null;
    if(typeof message == "string"){    
        messageBlock = (<Message content={message}/>);
    }
    else{
        let messageLink = (<MessageLink href={message["downloadUrl"]} linkName={message["fileName"]}/>);
        messageBlock = <Message content={messageLink}/>
    }
    return(<div id="messageArea">{messageBlock}</div>);
}

export default MessageArea;
