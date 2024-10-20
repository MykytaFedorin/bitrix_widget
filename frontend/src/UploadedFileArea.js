import './UploadedFileArea.css';
function UploadedFileArea({fileName, uploadedFileVisibility}){
    return(<div id="uploadedFileArea" style={uploadedFileVisibility}>
        <span id="uploadedFileName">{fileName}</span></div>);
}
export default UploadedFileArea;
