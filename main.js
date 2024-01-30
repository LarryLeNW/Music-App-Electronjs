const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const electronReload = require("electron-reload");

electronReload(__dirname);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })
    );

    if (process.env.NODE_ENV === "development") {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
