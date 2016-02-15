'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
var dev_environment = "dev";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window and set minimum heright and width
  mainWindow = new BrowserWindow({width: 420, height: 370,
                                  minWidth:420, minHeight:370,
                                  maxWidth:420, maxHeight:370,maximizable:false,fullscreen:false});


  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //hide the default window menu
  mainWindow.setMenu(null);

  // debugging settings
  if (dev_environment=="testing") {
      mainWindow.webContents.openDevTools();
      mainWindow.setMenu(true);
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

//work on main events
const ipcMain = require('electron').ipcMain;

ipcMain.on('command_channel', function(event, arg) {
  console.log("Django server started");
});


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
