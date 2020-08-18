const assert = require('assert');
const AppSettings = require('./fixtures/app-settings.fixture.json');
const EnvironmentHelper = require('../js/backup-utils/utils/environment-helper');

describe('Environment-Based Object Creation', () => {
  it('Should return the FTP formatted credentials from our app-settings', () => {
    let ftpObject = EnvironmentHelper.setFTPSettings(AppSettings);
    let expectedFTPObject = {
      host: 'yourFTPHost.io',
      user: 'yourFTPUser',
      password: 'yourFTPPassword',
      port: '21',
    };

    // Need to do a better way of comparing, because ftpObject is a 'new HostSettings Object'
    // The JSON.stringify is an easy way of validating without running into the prototype
    ftpObject = JSON.stringify(ftpObject);
    expectedFTPObject = JSON.stringify(expectedFTPObject);
    assert.equal(ftpObject, expectedFTPObject);
  });

  it('Should return the SFTP formatted credentials from our app-settings', () => {
    let sftpObject = EnvironmentHelper.setSFTPSettings(AppSettings);
    let expectedSFTPObject = {
      host: 'yourSFTPHost.io',
      user: 'yourSFTPUser',
      password: 'yourSFTPPassword',
      port: '7767',
    };

    sftpObject = JSON.stringify(sftpObject);
    expectedSFTPObject = JSON.stringify(expectedSFTPObject);
    assert.equal(sftpObject, expectedSFTPObject);
  });
});
