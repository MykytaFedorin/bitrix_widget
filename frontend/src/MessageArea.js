import './MessageArea.css';

function MessageArea({message}){
    console.log("MessageArea.js");
    return(
        <div id="messageArea"><a href={message["downloadUrl"]}>{message["fileName"]}</a></div>
    )
}

export default MessageArea;
