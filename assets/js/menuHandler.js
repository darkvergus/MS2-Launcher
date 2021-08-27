const {app, remote} = require('electron');
const ipc = require('electron').ipcRenderer;
const shell = require('electron').shell;
const dialog = remote.dialog;

document.getElementById('close').addEventListener('click', closeWindow);
document.getElementById('minimize').addEventListener('click', minimizeWindow);
document.getElementById('github').addEventListener('click', github);
document.getElementById('discord').addEventListener('click', discord);
document.getElementById('vs').addEventListener('click', vs); 
document.getElementById('play').addEventListener('click', play);
document.getElementById('add').addEventListener('click', show);
var iptoggle =document.getElementById('ip-toggle');
var ip = document.getElementById('ip');
ip.addEventListener('input', validateInput);
document.getElementById('send').addEventListener('click', add);
document.getElementsByClassName('delete').addEventListener('click', remove);

function closeWindow() {
    dialog.showMessageBox({
        type: 'question',
        buttons: ["Yes", "No"],
        defaultId: 0,
        icon: '',
        title: 'Close Window',
        message: 'Would you like to exit MS2 Launcher?',
        detail: 'Click yes will close the window',
        normalizeAccessKeys: false,
    }).then(box => {
        if (box.response === 0) {
            remote.BrowserWindow.getFocusedWindow().close();
        }
    }).catch(err => {
        console.log(err)
    });
}

function minimizeWindow() {
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function github() {
    event.preventDefault();
    shell.openExternal(this.href);
}

function discord() {
    event.preventDefault();
    shell.openExternal(this.href);
}

function vs() {
    event.preventDefault();
    shell.openExternal(this.href);
}

function play() {
    //todo play button
    alert("play");
}

function validateInput() {
    this.className = validateIpAndPort(this.value) ? "" : "invalid";
}

function add() {
    event.preventDefault();
    if(validateIpAndPort(ip.value) == false) 
    {
        //show popup that theres an error?
    } 
    else 
    {
        const serverList = document.getElementById('serverList');
        let server = document.createElement('div');
        server.className = 'currentServer';
        server.innerHTML = '<div class="status"></div><div class="server">' + ip.value + '</div><div class="delete"></div>';
        serverList.appendChild(server);
        iptoggle.className -= 'show';
        ip.value = '';

    }
}

function remove() {
    
}

function show() {
    event.preventDefault();
    iptoggle.className = 'show';
}

function validateIpAndPort(input) {
    var parts = input.split(":");
    var ip = parts[0].split(".");
    var port = parts[1];
    return validateNum(port, 1, 65535) &&
        ip.length == 4 &&
        ip.every(function (segment) {
            return validateNum(segment, 0, 255);
        });
}

function validateNum(input, min, max) {
    var num = +input;
    return num >= min && num <= max && input === num.toString();
}