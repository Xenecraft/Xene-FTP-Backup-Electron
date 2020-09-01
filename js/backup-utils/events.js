// Methods we export
const emitMessage = (message) => {
  const logEvent = new CustomEvent('logIt', { detail: { msg: message } });
  document.dispatchEvent(logEvent);
};

const listenMessage = () => {
  document.addEventListener('logIt', (event) => {
    const logHtmlString = '<br>' + event.detail.msg;
    document.getElementsByClassName('panel-body')[0].innerHTML += logHtmlString;
  });
};

module.exports = {
  emitMessage,
  listenMessage,
};
