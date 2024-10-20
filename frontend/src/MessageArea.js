import './MessageArea.css';

function MessageArea({message}){
    console.log("MessageArea.js");
    if(typeof message == "string"){    
        return(
            <div id="messageArea">{message}</div>
        )
    }
    else{
        return(
            <div id="messageArea"><a href={message["downloadUrl"]}>{message["fileName"]}</a></div>
        )
    }
}

export default MessageArea;
