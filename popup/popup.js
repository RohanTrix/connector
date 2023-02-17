

async function connectHandler() {
    console.log('hey');
    let people = document.getElementsByClassName('entity-result__actions entity-result__divider');
    for(let person of people){
        let personObj = person.getElementsByTagName('button')[0];
        
        if(personObj.innerText === "Connect"){
            
            personObj.click();
            await new Promise(r => setTimeout(r, Math.floor(5000)));

            document.querySelector('.send-invite button.artdeco-button--primary').click()
            await new Promise(r => setTimeout(r, 2000));
            
        }
    }
}


document.querySelector('.hovbutton').addEventListener('click', () => {
    
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, func: connectHandler
        })})

});

