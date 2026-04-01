const { app, BrowserWindow, Menu, nativeTheme } = require('electron')
const path = require('path')

function createWindow() {
  const window = new BrowserWindow({
    width: 1680,
    height: 1120,
    minWidth: 1180,
    minHeight: 760,
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
  window.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null)
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
