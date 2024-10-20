import './MessageArea.css';
import MessageLink from './MessageLink';
import Message from './Message.js';

function MessageArea({ messages }) {
    console.log("MessageArea.js");

    return (
        <div id="messageArea">
            {messages.map((message, index) => {
                let messageBlock = null;
                if (typeof message === "string") {
                    messageBlock = <Message content={message} key={index} />;
                } else {
                    let messageLink = <MessageLink href={message["downloadUrl"]} linkName={message["fileName"]} />;
                    messageBlock = <Message content={messageLink} key={index} />;
                }
                return messageBlock;
            })}
        </div>
    );
}

export default MessageArea;

