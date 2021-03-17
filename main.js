const {app, BrowserWindow, ipcMain } = require('electron')
const path =  require('path')
const dev =  require('electron-reload')


if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname, 'node_modules', 'bin', 'electron')
    })

}

let mainWindow

function createWindow(){
    mainWindow =  new BrowserWindow({
        width:1200,
        height:800,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname,'preload.js') 
        }
    })

    mainWindow.loadFile('./src/index.html')


}

app.whenReady().then(createWindow)

ipcMain.on('imagenes',(e,data)=>{

    let imagenes  = data

    mainWindow.webContents.send('listaImagenes',imagenes)
})