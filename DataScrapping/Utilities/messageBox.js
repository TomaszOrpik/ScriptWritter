const electron = require('electron');

module.exports.messageBox = function messageBox(error, failResponse) {
    console.log(error);
    const notification = {
        title: `Page data error: ${error}`,
        body: error
    }

    new electron.remote.Notification(notification).show();
    return failResponse;
}