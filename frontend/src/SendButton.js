function SendButton() {
    const url = process.env.REACT_APP_PYTHON_API_URL
    const upload_url = url+"/cover_letter/generate"; 
    const messageArea = document.getElementById("messageArea");
    const sendFile = () => {
        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        const textInput = document.querySelector('input[type="text"]');
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]); 
            formData.append('description', textInput.value); 
            fetch(upload_url, {
                method: 'POST',
                body: formData,
                headers: {
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => messageArea.innerHTML = data)
            .catch((error) => console.error('Error:', error));
        } else {
            console.log("File not uploaded");
        }
    };

    return <button onClick={sendFile}>Отправить</button>;
}

export default SendButton;

