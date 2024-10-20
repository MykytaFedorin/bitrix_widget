import './Message.css';
function Message({content}){
    return(<div className="message"><span className="messageContent">{content}</span></div>);
}
export default Message;
