const { app, BrowserWindow } = require('electron');
///to change for demo
app.on('ready', () => {
    let myWindow = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        resizable: false,
        transparent: true,
        icon: __dirname + './Images/icon.ico',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    });
    myWindow.on('ready-to-show', () => {
        myWindow.focus();
        myWindow.show();
        myWindow.webContents.openDevTools({ mode: 'undocked' });
    });

    myWindow.setAutoHideMenuBar(true);
    myWindow.loadFile('index.html');
});

app.on('activate', () => {
    BrowserWindow.getAllWindows().map(myWindow => myWindow.show());
});

