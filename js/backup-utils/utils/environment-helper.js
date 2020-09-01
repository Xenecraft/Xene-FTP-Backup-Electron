class HostSettings {
  constructor(host, user, password, port) {
    this.host = host;
    this.user = user;
    this.username = user;
    this.password = password;
    this.port = port;
  }
}

const setFTPSettings = (settingsObject) => {
  return new HostSettings(settingsObject.ftpHost,
    settingsObject.ftpUser,
    settingsObject.ftpPassword,
    settingsObject.ftpPort);
};

const setSFTPSettings = (settingsObject) => {
  return new HostSettings(settingsObject.sftpHost,
    settingsObject.sftpUser,
    settingsObject.sftpPassword,
    settingsObject.sftpPort);
};

module.exports = {
  setFTPSettings,
  setSFTPSettings,
};
