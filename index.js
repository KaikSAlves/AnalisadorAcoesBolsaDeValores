const {app, BrowserWindow} = require("electron");


let window;

app.on("ready", () =>{
    window = new BrowserWindow({
        minWidth: 700,
        height: 600,
        autoHideMenuBar: true,
        darkTheme: window,
    })

    window.loadURL(`file://${__dirname}/index.html`);

});