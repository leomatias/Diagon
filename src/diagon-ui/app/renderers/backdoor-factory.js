const { ipcRenderer, remote } = require('electron');
const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');
const https = require('https');
const homedir = require('os').homedir();
var prismdir = path.join(homedir, '.prismatica')
var diagondir = path.join(prismdir, 'Diagon')

export default function payloadGenerator(payload) {

  if (!fs.existsSync(prismdir)) {
    fs.mkdirSync(prismdir);
    fs.writeFile(settingsconf, '{"test":"tmp"}');
  }
  if (!fs.existsSync(diagondir)) {
    fs.mkdirSync(diagondir);
    var arsenal = path.join(diagondir, 'Arsenal')
    var templates = path.join(arsenal, 'templates')
    fs.mkdirSync(arsenal);
    fs.mkdirSync(templates);

    //Get gryffindor config
    var file = fs.createWriteStream(path.join(arsenal, 'gryffindor.json'));
    var request = https.get("https://raw.githubusercontent.com/Project-Prismatica/Diagon/master/Arsenal/Gryffindor.json", function(response) {
      response.pipe(file);
    });

    //Get gryffindor template
    var file2 = fs.createWriteStream(path.join(templates, 'gryffindor.js'));
    var request = https.get("https://raw.githubusercontent.com/Project-Prismatica/Diagon/master/Arsenal/templates/gryffindor.js", function(response) {
      response.pipe(file2);
    });

    }

  //Get payload build conf
  fs.readFile('C:\\Projects\\Prismatica\\Diagon\\Arsenal\\' + payload + '.json', 'utf8', function(err, contents) {


  //Exec all build commands
  Object.entries(JSON.parse(contents).buildcmds).forEach(entry => {
    let key = entry[0];
    let value = entry[1];
    console.log(value.cmd)

    exec(value.cmd, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`${stdout}`);
      console.log(`${stderr}`);
    });
  });
  });
}