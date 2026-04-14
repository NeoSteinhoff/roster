const { app, BrowserWindow, Menu, nativeTheme } = require('electron')
const path = require('path')

function buildAppMenu() {
  return Menu.buildFromTemplate([
    { role: 'appMenu' },
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
  ])
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1560,
    height: 1040,
    minWidth: 980,
    minHeight: 680,
    resizable: true,
    maximizable: true,
    fullscreenable: true,
    useContentSize: true,
    backgroundColor: '#080b12',
    title: 'Roster',
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, 'assets', 'roster-logo.svg.png'),
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
    },
  })

  nativeTheme.themeSource = 'dark'
  window.webContents.on('before-input-event', (event, input) => {
    if (process.platform === 'darwin' && input.type === 'keyDown' && input.meta && String(input.key).toLowerCase() === 'q') {
      event.preventDefault()
      app.quit()
    }
  })
  window.loadFile(path.join(__dirname, 'app.html'))
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(buildAppMenu())
  if (process.platform === 'darwin' && app.dock) {
    app.dock.setIcon(path.join(__dirname, 'assets', 'roster-logo.svg.png'))
  }
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
