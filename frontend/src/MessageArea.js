import './MessageArea.css';
import MessageLink from './MessageLink';
import Message from './Message.js';

function MessageArea({ messages }) {
    console.log("MessageArea.js");

    return (
        <div id="messageArea">
            {messages.map((message, index) => {
                let messageBlock;

                if (typeof message === "string") {
                    messageBlock = <Message content={message} key={index} />;
                } else {
                    const messageLink = (
                        <MessageLink 
                            href={message["downloadUrl"]} 
                            linkName={message["fileName"]} 
                        />
                    );
                    messageBlock = <Message content={messageLink} key={index} />;
                }

                return messageBlock; // Возвращаем элемент блока сообщения
            })}
        </div>
    );
}

export default MessageArea;

