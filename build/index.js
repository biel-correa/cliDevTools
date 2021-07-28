var args = process.argv.slice(2);
var command = args[0];
var colors = require('colors');
switch (command) {
    case 'convert64':
        to64(args);
        break;
    case 'resize':
        resize(args);
        break;
    case 'help':
        help();
        break;
    case 'topng':
        topng();
        break;
    case 'togreyscale':
        togreyscale();
        break;
    case 'open':
        openSearch();
        break;
    case 'color':
        colorPicker(args);
        break;
    default:
        console.log(colors.red("Command not found"));
        help();
        break;
}
function colorPicker(args) {
    var opn = require('opn');
    if (args[1] != undefined && args[1].length == 6) {
        var color = args[1];
        color.replace('#', '');
        opn('https://coolors.co/' + color);
    }
    else if (args[1] != undefined && args[1].length != 6) {
        console.log(colors.yellow("Please use a full size HEX color Ex: ") + colors.white("#FFFFFF"));
    }
    else {
        opn('https://coolors.co/000000');
    }
}
function openSearch() {
    var link = args[1];
    var opn = require('opn');
    if (args[2] != undefined && link == "google" || args[2] != undefined && link == "g") {
        var pesquisa = args[2].replace(/\s+/g, '+');
        opn('https://google.com.br/search?ie=UTF-8&q=' + pesquisa);
    }
    else {
        opn('https://' + link);
    }
}
function togreyscale() {
    var filename = args[1];
    var path = filename;
    var sharp = require('sharp');
    if (filename.slice(0, 2) == '.\\' || filename.slice(0, 2) == './') {
        filename = filename.slice(2, filename.length);
        filename = filename.slice(0, filename.length - 4);
    }
    sharp(path).greyscale(true).png().toFile('greyScaled-' + filename + ".png").then(function (res) {
        console.log(colors.blue("Image successfully created as: ") + 'greyScaled-' + filename + ".png");
    })["catch"](function (info) {
        console.log(colors.red('Something went wrong'));
        console.log(info.red);
    });
}
function topng() {
    var filename = args[1];
    var path = args[1];
    var sharp = require('sharp');
    if (filename.slice(0, 2) == '.\\' || filename.slice(0, 2) == './') {
        filename = filename.slice(2, filename.length);
        filename = filename.slice(0, filename.length - 4);
    }
    sharp(path).png().toFile(filename + '.png').then(function (info) {
        console.log(colors.blue('Image successfully created as: ') + filename + '.png');
    })["catch"](function (res) {
        console.log(colors.red('Something went wrong'));
    });
}
function help() {
    console.log(colors.blue('Existing commands:'));
    console.log(colors.blue('convert64 [path-to-file]'));
    console.log(colors.blue('resize [path-to-file] [width] [height]'));
    console.log(colors.blue('topng [path-to-file]'));
    console.log(colors.blue('togreyscale [path-to-file]'));
    console.log(colors.blue('open [exact-link or "google"] ["google search"]'));
    console.log(colors.blue('color [HEX color](optional)'));
}
function resize(args) {
    var fileName = args[1];
    var width = args[2];
    var height = args[3];
    if (width == 'null') {
        width = undefined;
    }
    if (height == 'null') {
        height = undefined;
    }
    if (typeof (fileName) != 'string') {
        console.log(colors.red('File not set or not found'));
        console.log(colors.blue('resize [path-to-file] [width] [height]'));
    }
    else {
        fileName = fileName.slice(2, fileName.length);
    }
    if (typeof (width) != 'string' && typeof (height) == 'string') {
        var jimp_1 = require('jimp');
        jimp_1.read(fileName, function (err, file) {
            if (err)
                throw colors.red('Something went wrong with the image, try another.');
            file.resize(parseInt(jimp_1.AUTO), parseInt(height)).write(height + '-' + fileName);
        });
    }
    else if (typeof (width) == 'string' && typeof (height) != 'string') {
        var jimp_2 = require('jimp');
        jimp_2.read(fileName, function (err, file) {
            if (err)
                throw colors.red('Something went wrong with the image, try another.');
            file.resize(parseInt(width), parseInt(jimp_2.AUTO)).write(width + '-' + fileName);
        });
    }
    else if (typeof (width) == 'string' && typeof (height) == 'string') {
        var jimp = require('jimp');
        jimp.read(fileName, function (err, file) {
            if (err)
                throw colors.red('Something went wrong with the image, try another.');
            file.resize(parseInt(width), parseInt(height)).write(width + 'x' + height + '-' + fileName);
        });
    }
}
function to64(args) {
    var fileName = args[1];
    var base64 = require('./node_modules/image-to-base64/image-to-base64.min.js');
    if (fileName.slice(0, 2) == "./" || fileName.slice(0, 2) == ".\\") {
        fileName = fileName.slice(2, fileName.length);
    }
    if (fileName.length <= 0) {
        console.log(colors.red('No name passed'));
        console.log(colors.blue('EX: conversor NomeDoArquivo.jpg'));
    }
    else {
        base64('./' + fileName)
            .then(function (data) {
            var path = require('./node_modules/path/path.js');
            var FileManager = require('./node_modules/file-manager/index.js');
            var manager = new FileManager(path.join('./'));
            var newName = fileName.slice(0, fileName.length - 4);
            manager.saveFile('./64-' + newName, data);
            console.log(colors.blue('File successfully created as: ') + '64-' + newName);
        })["catch"](function (res) {
            console.log(colors.red('Not able to convert, check file name'));
        });
    }
}
