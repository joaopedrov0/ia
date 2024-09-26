const fs = require('fs');
const path = require('path');

DictionaryPath = path.join(__dirname, 'dictionary.json')

let dictionary = readJSON(DictionaryPath)

console.log(dictionary)

// dictionary.forEach((parameter) => {
//     parameter[0] = parameter[0].toLowerCase()
//     parameter[1] = parameter[1].toLowerCase()
// })

dictionary = dictionary.filter((value) => value[0] !== '' && value[1] !== '' && value[0] !== ' ' && value[1] !== ' ')

console.log(dictionary)

writeJSON(DictionaryPath, dictionary)





function readJSON(path){
    try {
        const data = fs.readFileSync(path, 'utf8');
        const object = JSON.parse(data);
        return object
    } catch (e) {
        console.error('Erro ao ler o arquivo JSON:', e);
        return null
    }
}

function writeJSON(path, object){
    try {
        const data = JSON.stringify(object, null, 2)
        fs.writeFileSync(path, data, 'utf-8')
        console.log('Arquivo JSON gravado com sucesso!')
    } catch (e) {
        console.error('Erro ao gravar o arquivo JSON:', e)
    }
}