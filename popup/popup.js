function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  }

async function connectHandler() {
    let people = document.getElementsByClassName('entity-result__actions entity-result__divider');
    for(let person of people){
        let personObj = person.getElementsByTagName('button')[0];
        
        if(personObj.innerText === "Connect"){
            
            personObj.click();
            let randomNum = Math.floor(Math.random() * 6) + 5;
            await new Promise(r => setTimeout(r, randomNum * 1000));

            document.querySelector('.send-invite button.artdeco-button--primary').click()
            await new Promise(r => setTimeout(r, 2000));

            chrome.runtime.sendMessage({connectSuccess: "true"});
        }
    }
}

document.querySelector('.hovbutton').addEventListener('click', async () => {
    
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, func: connectHandler
        })})
});

let connectCnt = 0;
var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;
setProgress(0);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
{
    connectCnt++;
    document.querySelector('#connectCnt').textContent = `Connections Sent: ${connectCnt}`; 
    let progVal = (connectCnt/10)*100
    setProgress(progVal);
})