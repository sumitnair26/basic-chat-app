//Websocekt variables
const url = "ws://localhost:9876/myWebsocket"
const mywsServer = new WebSocket(url)

//DOM Elements
const userName = document.getElementById("userName");
const myMessages = document.getElementById("messages")
const myInput = document.getElementById("message")
const sendBtn = document.getElementById("send")
const nextBtn = document.getElementById("next");

nextBtn.disabled = true
sendBtn.disabled = true
sendBtn.addEventListener("click", sendMsg)

function next() {
    if (document.getElementById("userName").value!='') {
        document.getElementById("userNameDiv").style.display = "none";
        document.getElementById("messageDiv").style.display = "block";
    }
}

//Sending message from client
function sendMsg() {
    const text = myInput.value
    const uName = userName.value
    //msgGeneration(text, uName);
    mywsServer.send(JSON.stringify({ message: text, sender: uName }))
}

//Creating DOM element to show received messages on browser page
function msgGeneration(msg, from) {
    const newMessage = document.createElement("h5")
    newMessage.innerText = `${from} says: ${msg}`
    myMessages.appendChild(newMessage)
}

//enabling send message when connection is open
mywsServer.onopen = function() {
    sendBtn.disabled = false
    nextBtn.disabled = false
}

//handling message event
mywsServer.onmessage = function(event) {
    const { data } = event
    const parsedData = JSON.parse(data)
    const { message, sender } = parsedData
    msgGeneration(message, sender)
}