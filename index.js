/*
Explorar funcoes do manipulador de imagens
fazer gerador de codigo de cor a partir do rgb
*/

var args = process.argv.slice(2)
var command = args[0]
var colors = require('colors')

if (command == 'convert64') {
    to64(args)
} else if (command == 'resize') {
    resize(args)
}else if(command == 'help'){
    help()
}else if(command == 'svgtopng'){
    topng()
}else {
    console.log("Command not found".red)
    help()
}

function topng(){
    let filename = args[1]
    let path = args[1]
    let sharp = require('sharp')

    if (filename.slice(0,2) == '.\\' || filename.slice(0,2) == './') {
        filename = filename.slice(2, filename.length)
        filename = filename.slice(0, filename.length - 4)
    }
    sharp(path).png().toFile(filename + '.png').then(info => {
        console.log('Image successfully created as: '.blue + filename + '.png')
    }).catch(res =>{
        console.log('Something went wrong'.red)
    })
}

function help(){
    console.log('Existing commands:'.blue)
    console.log('convert64 [path-to-file]'.blue)
    console.log('resize [path-to-file] [width] [height]'.blue)
    console.log('topng [path-to-file]'.blue)
}

function resize(args) {
    let fileName = args[1]
    let width = args[2]
    let height = args[3]

    if (width == 'null') {
        width = undefined
    }
    if (height == 'null') {
        height = undefined
    }


    if (typeof (fileName) != 'string') {
        console.log('File not set or not found'.red)
        console.log('resize [path-to-file] [width] [height]'.blue)
    } else {
        fileName = fileName.slice(2, fileName.length)
    }
    if (typeof (width) != 'string' && typeof (height) == 'string') {
        console.log('a'.red)
        let jimp = require('jimp')
        jimp.read(fileName, (err, file) => {
            if (err) throw 'Something went wrong with the image, try another.'.red
            file.resize(parseInt(jimp.AUTO), parseInt(height)).write(height + '-' + fileName)
        })
    } else if (typeof (width) == 'string' && typeof (height) != 'string') {
        console.log('a'.blue)
        let jimp = require('jimp')
        jimp.read(fileName, (err, file) => {
            if (err) throw 'Something went wrong with the image, try another.'.red
            file.resize(parseInt(width), parseInt(jimp.AUTO)).write(width + '-' + fileName)
        })
    } else if (typeof (width) == 'string' && typeof (height) == 'string') {
        console.log('a'.green)
        let jimp = require('jimp')
        jimp.read(fileName, (err, file) => {
            if (err) throw 'Something went wrong with the image, try another.'.red
            file.resize(parseInt(width), parseInt(height)).write(width + 'x' + height + '-' + fileName)
        })
    }
}

function to64(args) {
    var fileName = args[1]
    const base64 = require('./node_modules/image-to-base64/image-to-base64.min.js')
    if (fileName.slice(0, 2) == "./" || fileName.slice(0, 2) == ".\\") {
        fileName = fileName.slice(2, fileName.length)
    }
    if (fileName.length <= 0) {
        console.log('No name passed'.red)
        console.log('EX: conversor NomeDoArquivo.jpg'.blue)
    } else {
        base64('./' + fileName)
            .then((data) => {
                const path = require('./node_modules/path/path.js')
                const FileManager = require('./node_modules/file-manager/index.js')

                let manager = new FileManager(path.join('./'))
                let newName = fileName.slice(0, fileName.length - 4)
                manager.saveFile('./64-' + newName, data)
                console.log('File successfully created as: '.blue + '64-' + newName)
            }).catch((res) => {
                console.log('Not able to convert, check file name'.red)
            })
    }

}