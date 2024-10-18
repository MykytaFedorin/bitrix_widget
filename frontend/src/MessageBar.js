import FileUploadButton from './FileUploadButton'
import SendButton from './SendButton'
import TextInputField from './TextInputField'
import './MessageBar.css'

function MessageBar(){
    return (
    <div id="messageBar">
      <FileUploadButton />
      <TextInputField/>
      <SendButton id="sendBtn"/>
    </div>);
}
export default MessageBar;
