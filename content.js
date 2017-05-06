var timer_value = -1;
var clock = 0;
//alert('content.js is running');
var timerObj = undefined;
var status="stopped"; //stopped, running, paused

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.reset==true){
        clearInterval(timerObj);
        var el = document.getElementById('timer_container');
        el.parentNode.removeChild(el);
        clock=0;
        timer_value=-1;
        status="stopped";
    }
    else if(request.pause==true && status=="running"){
        clearInterval(timerObj);
        status="paused";
    }
    else if(request.resume==true && status=="paused"){
        timerObj = setInterval(tick,1000);
        status="running";
    }
    else if(request.tick != undefined) {
        timer_value = request.tick;
        //document.getElementById('timer_container').innerHTML = timer_value+'seconds';
        //alert(timer_value);
        if(document.getElementById('timer_container') == undefined) {
            var container = document.createElement('div');
            container.id="timer_container";
            document.getElementsByTagName('body')[0].insertBefore(container,undefined);
        }
        status="running";
        //.appendChild(container);
        tick();
        timerObj = setInterval(tick, 1000);
        //alert('element added');
    }
    
    //alert(request.message);
});
/*
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.get(tabs[0].id).;
         });
*/
function tick(){
    if(clock<=timer_value){
        time_to_display = secondsToHms( timer_value - clock );
        document.getElementById('timer_container').innerText= time_to_display;
        clock = clock +1;
    }
    else{
        document.getElementById('timer_container').innerText= "TIME UP!";
        clearInterval(timerObj);
    }
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    h= h>9?h:"0"+h;
    var m = Math.floor(d % 3600 / 60);
    m= m>9?m:"0"+m;
    var s = Math.floor(d % 3600 % 60);
    s= s>9?s:"0"+s;
    
    //return h +':'+ m +':'+ s; 
    return m +':'+ s; 
}
