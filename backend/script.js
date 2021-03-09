const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const namePrompt = prompt('Qual o seu nome?');
appendMessage('Você entrou.');
socket.emit('new-user', namePrompt);

socket.on('chat-message', data=>{
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', username =>{
    appendMessage(`${username} conectou.`);
});

socket.on('user-disconnected', username =>{
    appendMessage(`${username} desconectou.`);
});

messageForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`Você: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}