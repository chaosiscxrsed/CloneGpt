const chatInput= document.querySelector("#chat-input");
const sendButton= document.querySelector("#send-btn");
const chatContainer= document.querySelector(".chat-container");
const themeButton= document.querySelector("#theme-btn");
const deleteButton= document.querySelector("#delete-btn");

let userText= null;
const initialHeight= chatInput.scrollHeight;

const loadDataFromLocalStorage=()=>{
    const themeColor= localStorage.getItem("theme-color");
    document.body.classList.toggle("light-mode", themeColor==="light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode": "light_mode";
    
    const defaultText=`<div class="default-text">
                            <h1>ChatGPT Resurfaced</h1>
                            <p>Start a conversation with the AI.<br></p>
                            </div>`;

    chatContainer.innerHTML= localStorage.getItem("all-chats")||defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);


}

loadDataFromLocalStorage();

const createElement=(html, className)=> {
    const chatDiv= document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML= html;
    return chatDiv;
} 
const copyResponse =(copyBtn)=>{
    const responseTextElement= copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.textContent= "done";
    setTimeout(()=> copyBtn.textContent= "content_copy", 1000);
}
const getChatResponse= (incomingChatDiv)=> {
    const pElement=document.createElement("p");
    try{
        setTimeout(()=>{
        const response="I guess you mean 'Hello World'";
        pElement.textContent= response;
        }, 1600);
        
    }catch(error){
        pElement.classList.add("error");
        pElement.textContent= "Sorry! Something went wrong while generating response. Please try again.";
    }
    incomingChatDiv.querySelector(".chat-detail").appendChild(pElement);
    setTimeout(()=>{
        incomingChatDiv.querySelector(".typing-animation").remove();
    }, 1600);
    localStorage.setItem("all-chats", chatContainer.innerHTML);


}
const showTypingAnimation= () => {
    const html= `<div class="chat-content">
                    <div class="chat-detail">
                        <img src="chatbot.jpg" width="35px" height="35px" alt="bot">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-outlined">content_copy</span>
                </div>`;

const incomingChatDiv= createElement(html, "incoming"); 
chatContainer.appendChild(incomingChatDiv); 
chatContainer.scrollTo(0, chatContainer.scrollHeight);
getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
 userText= chatInput.value.trim();
 if(!userText) return;
 
 chatInput.value= "";
 chatInput.style.height=`${initialHeight}px`;

const html= ` <div class="chat-content">
                <div class="chat-detail">
                    <img src="fushiguro.jpg" width="35px" height="35px" alt="user">
                    <p></p>
                </div>
            </div>`;
document.querySelector(".default-text")?.remove();
const outgoingChatDiv= createElement(html, "outgoing"); 
outgoingChatDiv.querySelector("p").textContent= userText;
chatContainer.appendChild(outgoingChatDiv);  
chatContainer.scrollTo(0, chatContainer.scrollHeight);
setTimeout(showTypingAnimation, 500);      
}

themeButton.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme-color", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode": "light_mode";
});
deleteButton.addEventListener("click", ()=>{
    if(confirm("Are you sure to delete all the chats?")){
        localStorage.removeItem("all-chats");
        loadDataFromLocalStorage();
    }
});

chatInput.addEventListener("input", () => {
    chatInput.style.height=`${initialHeight}px`;
    chatInput.style.height=`${chatInput.scrollHeight}px`;

});
chatInput.addEventListener("keydown", (e) => {
    if(e.key==="Enter"&& !e.shiftKey && window.innerWidth>800){
        e.preventDefault();
        handleOutgoingChat();
    }
});
sendButton.addEventListener("click", handleOutgoingChat);