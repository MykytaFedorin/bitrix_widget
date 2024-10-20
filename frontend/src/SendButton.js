function SendButton() {
    const python_url = process.env.REACT_APP_PYTHON_API_URL;
    const php_url = process.env.REACT_APP_PHP_API_URL;
    const letter_url = python_url + "/cover_letter/generate"; 
    const cv_url = php_url + "/cv/find"; 

    const sendFile = () => {
        const formData = new FormData();
        const messageArea = document.getElementById("messageArea");
        const fileInput = document.querySelector('input[type="file"]');
        const textInput = document.querySelector('input[type="text"]');

        if (!messageArea) {
            console.error("Message area not found");
            return;
        }

        if (textInput.value === "") {
            messageArea.innerHTML = "Description is required";
            return;
        }

        messageArea.innerHTML = "Обработка...";
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
            formData.append('description', textInput.value);
            fetch(letter_url, {
                method: 'POST',
                body: formData,
                headers: {},
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                messageArea.innerHTML = JSON.stringify(data);  // Отображение результата
            })
            .catch((error) => {
                messageArea.innerHTML = `Error: ${error.message}`;
                console.error('Error:', error);
            });
        } else {
            fetch(cv_url, {
                method: 'POST',
                body: JSON.stringify({"description": textInput.value}),
                headers: { 'Content-Type': 'application/json'},
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                messageArea.innerHTML = JSON.stringify(data);  // Отображение результата
            })
            .catch((error) => {
                messageArea.innerHTML = "Error:" + error.message;
                console.error('Error:', error);
            });
        }
    };

    return <button onClick={sendFile}>Отправить</button>;
}

export default SendButton;

