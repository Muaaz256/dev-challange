let users = [];
let messages = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('./data/messages.json').then(data => data.json()).then(messagesData => {
    messages = messagesData;
    fetch('./data/users.json').then(data => data.json()).then(usersData => {
      users = usersData;
      renderData()
    });
  });
});

function searchUserByUserId(userId) {
  return users.find(user => user.id === userId);
}

function searchMessageByChatId(chatId) {
  return messages.find(message => message.chatid === chatId);
}

function searchMessageById(messageId) {
  return messages.find(message => message.id === messageId);
}

function renderData() {
  const userForJson = searchUserByUserId(100);
  const messageForJson = searchMessageByChatId(8);
  renderJSONData('chat-id-8', messageForJson);
  renderJSONData('user-id-100', userForJson);
  
  let messageForEcho = searchMessageByChatId(3);
  let sender = searchUserByUserId(messageForEcho.userid);
  messageForEcho.sender = sender.username;
  renderMessageForEcho('chat-id-3', messageForEcho);

  messageForEcho = searchMessageById(459);
  sender = searchUserByUserId(messageForEcho.userid);
  messageForEcho.sender = sender.username;
  renderMessageForEcho('message-id-459', messageForEcho);
}

function renderJSONData(divId, data) {
  const div = document.getElementById(divId);
  div.removeChild(div.firstChild);
  const text = document.createTextNode(JSON.stringify(data));
  div.appendChild(text);
}

function appendTextToDiv(text) {
  const div = document.createElement('div');
  const textNode = document.createTextNode(text);
  div.appendChild(textNode);
  return div;
}


function renderMessageForEcho(divId, message) {
  const div = document.getElementById(divId);
  div.removeChild(div.firstChild);
  const messageTime = new Date(1591981211 * 1000);
  const idDiv = appendTextToDiv(`Message ID: ${message.id}`)
  const messageDiv = appendTextToDiv(`Message: ${message.message}`);
  const chatIdDiv = appendTextToDiv(`Chat ID: ${message.chatid}`);
  const senderDiv = appendTextToDiv(`Sender: ${message.sender}`);
  const timestampDiv = appendTextToDiv(`Message Time: ${messageTime}`);

  div.appendChild(idDiv);
  div.appendChild(messageDiv);
  div.appendChild(chatIdDiv);
  div.appendChild(senderDiv);
  div.appendChild(timestampDiv);
}