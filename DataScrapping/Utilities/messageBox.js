const electron = require('electron');

module.exports.messageBox = function messageBox(error, failResponse) {
    console.log(error);
    const notification = {
        title: 'Application could not access selector',
        body: error
    }

    new electron.remote.Notification(notification).show();
    return failResponse;
}