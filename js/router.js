const electronRouter = {
  navigate,
};

function navigate(urlString) {
  // if(isRunning)
  //  window.location.href = '/' + urlString;
  // else
  window.location.href = `/${urlString}.html`;
}

module.exports = electronRouter;
