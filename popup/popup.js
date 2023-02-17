

async function connectHandler() {
    
    let people = document.getElementsByClassName('reusable-search__result-container');
    for(let person of people){
        let personObj = person.querySelector('.entity-result__actions entity-result__divider');
        if(personObj.innerText === "Connect"){
            
            personObj.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary ember-view')[0].click();
            await new Promise(r => setTimeout(r, Math.floor(Math.random() * (10 - 5 + 1) + 5)));

            document.querySelector('.send-invite button.artdeco-button--primary').click()
            await new Promise(r => setTimeout(r, 1000))
            
        };
    }
}
async function injectScript() {
    
    if(document.querySelector('.hovbutton').textContent === "Start Connect") {
        document.querySelector('.hovbutton').textContent = "Stop Connect";
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.scripting.executeScript({target: {tabId: tabs[0].id}, func: connectHandler
            })})
        }
    else {
        document.querySelector('.hovbutton').textContent = "Start Connect";
        console.log("RESET");
        return;
    }

}
chrome.storage.local.set({ connectBtn: 0 }).then(() => {
    console.log("Value is set to " + value);
  });
document.querySelector('.hovbutton').addEventListener('click', injectScript)

