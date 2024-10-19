function SendButton() {
    const python_url = process.env.REACT_APP_PYTHON_API_URL;
    const php_url = process.env.REACT_APP_PHP_API_URL;
    const letter_url = python_url+"/cover_letter/generate"; 
    const cv_url = php_url+"/cv/generate"; 
    const sendFile = () => {
        const formData = new FormData();
        const messageArea = document.getElementById("messageArea");
        const fileInput = document.querySelector('input[type="file"]');
        const textInput = document.querySelector('input[type="text"]');
        if (fileInput.files.length > 0 && textInput.value !== "") {
            formData.append('file', fileInput.files[0]); 
            formData.append('description', textInput.value); 
            fetch(letter_url, {
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
        } 
        else if(fileInput.files.length){
            formData.append('file', fileInput.files[0]); 
            fetch(cv_url, {
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
            .then(data => console.log())
            .catch((error) => console.error('Error:', error));
            
        }
        else {
            console.log("File not uploaded");
        }
    };

    return <button onClick={sendFile}>Отправить</button>;
}

export default SendButton;

