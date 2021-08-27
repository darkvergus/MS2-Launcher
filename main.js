const {app, BrowserWindow} = require('electron');

app.on('ready', function() {
	const mainWindow = new BrowserWindow({
    width: 1280,
    height: 768,
    frame: false,
    center: true,
    show: false,
    title: "MS2-Launcher",
    icon: "icon.png",
    maximizable: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.on('did-finish-load', function() {
  	mainWindow.show();
  });

  mainWindow.on('close',function() {
    app.quit();
  });
  mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});