// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
var path = require('path')
const fs = require('fs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 750,
    maxWidth: 1400,
    maxHeight: 750,
    icon: path.join(__dirname, 'assets/icons/win/crusade64.png'),
    resizable: false,
    minimizable: false,
    maximizable: false,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Change the content of the file as you want
  // or either set fileContent to null to create an empty file
  var fileContent = '{"Informations":{"WoWDirectory":""}}';

  // The absolute path of the new file with its name
  var filepath = "userData.json";

  if (fs.existsSync(filepath)) {
      console.log("OK");
  } else {
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;

        console.log("The file was succesfully saved!");
    }); 
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
