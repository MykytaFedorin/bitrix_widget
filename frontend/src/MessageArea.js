import './MessageArea.css';
import MessageLink from './MessageLink';
function MessageArea({message}){
    console.log("MessageArea.js");
    let messageBlock = null;
    if(typeof message == "string"){    
        messageBlock = message;
    }
    else{
        messageBlock = (<MessageLink href={message["downloadUrl"]} linkName={message["fileName"]}/>);
    }
    return(<div id="messageArea">{messageBlock}</div>);
}

export default MessageArea;
