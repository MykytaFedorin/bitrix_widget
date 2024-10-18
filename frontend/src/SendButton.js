function SendButton(){
    const sendFile = () => {
        fetch('https://api.example.com/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: 'value' }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }  
    return <button onClick={sendFile}>Отправить</button>
}

export default SendButton;
