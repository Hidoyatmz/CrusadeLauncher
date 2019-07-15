const open = require('open');
const child = require('child_process').execFile;
const fs = require('fs');
const request = require('request');

function shownews() {
    var game = document.getElementById("game");
    game.classList.add("hidecontent");

    var gametext = document.getElementById("gametext");
    gametext.classList.remove("active");

    var news = document.getElementById("news");
    news.classList.remove("hidecontent");

    var newstext = document.getElementById("newstext");
    newstext.classList.add("active");

    var patch = document.getElementById("patch");
    patch.classList.add("hidecontent")

    var patchtext = document.getElementById("patchtext");
    patchtext.classList.remove("active");

}

function showgame() {
    var game = document.getElementById("game");
    game.classList.remove("hidecontent");

    var gametext = document.getElementById("gametext");
    gametext.classList.add("active");

    var news = document.getElementById("news");
    news.classList.add("hidecontent");

    var newstext = document.getElementById("newstext");
    newstext.classList.remove("active");

    var patch = document.getElementById("patch");
    patch.classList.add("hidecontent")

    var patchtext = document.getElementById("patchtext");
    patchtext.classList.remove("active");

}

function showpatch() {
    var game = document.getElementById("game");
    game.classList.add("hidecontent");

    var gametext = document.getElementById("gametext");
    gametext.classList.remove("active");

    var news = document.getElementById("news");
    news.classList.add("hidecontent");

    var newstext = document.getElementById("newstext");
    newstext.classList.remove("active");

    var patch = document.getElementById("patch");
    patch.classList.remove("hidecontent")

    var patchtext = document.getElementById("patchtext");
    patchtext.classList.add("active");

}

function openstore() {
    open('https://wow-crusade.com/store');
}

function opentops() {
    open('https://wow-crusade.com/leaderboard');
}

function playgame() {
    var fs = require('fs');
    var userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
    var gamepath = userData['Informations'].WoWDirectory;
    
    const executablePath = gamepath + "\\wow_8Gen.exe";

    child(executablePath, (error) => {
        if(error) {
            alert("An error occured when trying to launch the game from your game directory, make sure the directory selected in the configuration panel is good.");
        }
    });
}

function options() {
    const con = require('electron').remote.getGlobal('console')

    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;

    var win = new BrowserWindow({ 
        width: 600, 
        height: 200,
        maxWidth: 600,
        maxHeight: 200,
        resizable: false,
        minimizable: false,
        maximizable: false,
        titleBarStyle: 'customButtonsOnHover',
        frame: false,
        webPreferences: {
        nodeIntegration: true
        }
    });

    win.loadFile('options.html')

    win.on('closed', function () {
        win = null
    })
}

function openwebsite() {
    open("https://wow-crusade.com");
}

function updaterealmen() {
    var fs = require('fs');
    var userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
    const con = require('electron').remote.getGlobal('console')

    var directory = userData['Informations'].WoWDirectory;
    var filepath = directory + "\\Data\\enUS\\realmlist.wtf";
    var content = "set realmlist logon.wow-crusade.com";
    fs.writeFile(filepath, content, (err) => {
        if (err) {
            alert("Cant find the realmlist in this directory. Make sure you're selecting a World Of Warcraft folder.");
            return;
        }
        alert("The realmlist has been update.");
    });
}

function updaterealmfr() {
    var fs = require('fs');
    var userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
    const con = require('electron').remote.getGlobal('console')

    var directory = userData['Informations'].WoWDirectory;
    var filepath = directory + "\\Data\\frFR\\realmlist.wtf";
    var content = "set realmlist logon.wow-crusade.com";
    fs.writeFile(filepath, content, (err) => {
        if (err) {
            alert("Nous ne trouvons pas le chemin vers le realmlist. Soyez sûr de séléctioner la racine de votre fossier world of warcraft dans les paramètres.");
            return;
        }
        alert("Le realmlist a été mis à jour.");
    });
}

function downloadFile(configuration){
    return new Promise(function(resolve, reject){
        // Save variable to know progress
        var received_bytes = 0;
        var total_bytes = 0;
        const request = require('request');

        var req = request({
            method: 'GET',
            uri: configuration.remoteFile
        });

        var out = fs.createWriteStream(configuration.localFile);
        req.pipe(out);

        req.on('response', function ( data ) {
            // Change the total bytes value to get progress later.
            total_bytes = parseInt(data.headers['content-length' ]);
        });

        // Get progress if callback exists
        if(configuration.hasOwnProperty("onProgress")){
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length;

                configuration.onProgress(received_bytes, total_bytes);
            });
        }else{
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length;
            });
        }

        req.on('end', function() {
            resolve();
        });
    });
}

function downloadpatchA() {
    var userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
    var directory = userData['Informations'].WoWDirectory;
    var pr = document.getElementById("progress");
    pr.style.opacity = '1'; 

    downloadFile({
        remoteFile: "https://wow-crusade.com/image/vip.png",
        localFile: directory + "\\Data\\test.png",
        onProgress: function (received,total){
            var tperct = document.getElementById("perct");
            var status = document.getElementById("status");
            var percentage = Math.round((received * 100) / total);
            var pbar = document.getElementById("progressbar");
            pbar.style.width = percentage + '%';
            tperct.innerHTML = percentage + "%";
            status.innerHTML = "Téléchargement de : PATCH A";
        }
    }).then(function(){
        var status = document.getElementById("status");
        status.innerHTML = "PATCH A téléchargé.";
    });
}


function closealert() {
    var alert = document.getElementById("alert");
    alert.style.opacity = 0;
}

/*document.getElementById("close").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.close();
}); */