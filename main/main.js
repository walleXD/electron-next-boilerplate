// Packages
import electron from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'
import appRoot from 'app-root-path'

const { app, BrowserWindow } = electron
const { resolve } = appRoot

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  const devPath = 'http://localhost:8000/start'
  const prodPath = 'file://' + resolve('renderer/out/start/index.html')
  const url = isDev ? devPath : prodPath

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
