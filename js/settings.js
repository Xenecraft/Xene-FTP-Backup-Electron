// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { dialog } = require('electron').remote;
const settings = require('./app-settings');

const populateSettingsPage = () => {
  function populateValuesFromObject(settingsObject) {
    // console.log(settingsObject);
    for (let idx in settingsObject) {
      let inputSetting = document.getElementById(idx);
      if (inputSetting !== null) {
        inputSetting.value = settingsObject[idx];
      }
    }
  }

  function watchInputsForUpdate() {
    const inputArray = document.getElementsByTagName('input');
    for (let idx = 0; idx < inputArray.length - 1; idx++) {
      inputArray[idx].addEventListener('keyup', () => {
        // After Keyup on the Input, Do Something
        console.log(inputArray[idx].value, inputArray[idx]);
      });
    }
  }

  // Populate settings from app-settings.js
  populateValuesFromObject(settings.CONNECTION_SETTINGS);
  populateValuesFromObject(settings.COPY_PATH);
  populateValuesFromObject(settings.APP_SETTINGS);

  watchInputsForUpdate();

  const getFilePath = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
    }).then((filePath) => { console.log(filePath.filePaths); });
  };
  // Set this for destinationPath input
  document.getElementById('getFolderPath').addEventListener('click', getFilePath);
};

(populateSettingsPage());
