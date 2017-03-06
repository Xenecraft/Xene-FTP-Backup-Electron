'use strict';

//Methods we export
const events = {
  emitMessage,
  listenMessage,
};

function emitMessage(message){
	let logEvent = new CustomEvent('logIt', {detail: {msg: message}});
	document.dispatchEvent(logEvent);
};

function listenMessage(){
	document.addEventListener('logIt', (event)=>{
		let logHtmlString = '<br>' + event.detail.msg;
		document.getElementsByClassName('panel-body')[0].innerHTML += logHtmlString;
	});
}

module.exports = events;