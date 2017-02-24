// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const settings = require('./app-settings.js');

(function() {
  //Populate settings from settings.js
  populateValuesFromObject(settings.CONNECTION_SETTINGS);
  populateValuesFromObject(settings.COPY_PATH);
  populateValuesFromObject(settings.APP_SETTINGS);


  function populateValuesFromObject(settingsObject) {
    // console.log(settingsObject);
    for (let idx in settingsObject) {
      var inputSetting = document.getElementById(idx);
      if (inputSetting !== null) {
        inputSetting.value = settingsObject[idx];
      }
    }
  }

  watchInputsForUpdate();

  function watchInputsForUpdate() {
    let inputArray = document.getElementsByTagName('input');
    for (let idx = 0; idx < inputArray.length - 1; idx++) {
      inputArray[idx].addEventListener("keyup", () => {
        console.log(inputArray[idx].value);
      });
    }
  }
})();
