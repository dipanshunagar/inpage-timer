/*var port = chrome.extension.connect({
      name: "comm"
 });
*/
 document.getElementById('btn').onclick = function(){
   var timer = (parseInt(document.getElementById('interval_mins').value) * 60) + parseInt(document.getElementById('interval_secs').value)
 //  port.postMessage(timer);

   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {tick: timer});
            //alert('msg sent from back.js');
         });
   //alert('msg sent');
   /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: timer});
   });*/ 
};

document.getElementById('resetbtn').onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {reset:true});
  });
}
document.getElementById('pausebtn').onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {pause:true});
  });
}
document.getElementById('resumebtn').onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {resume:true});
  });
}