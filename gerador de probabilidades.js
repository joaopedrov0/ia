// let exemplo = 'lorem ipsum dolor sit amet, consectetur adipiscing el lorem ipsum dolor sit amet, consectetur adipiscing el'

const fs = require('fs');
const path = require('path');

DictionaryPath = path.join(__dirname, 'dictionary.json')

const dictionary = readJSON(DictionaryPath)
console.log(dictionary)

let input = `` // ! Insira o texto para alimentar o dicionário nessa string

// const prohibitedChars = [".",",","/","-","_","(",")","+","?","!","<",">","[","]","{","}","0","1","2","3","4","5","6","7","8","9", '"', "'", ":", ";", "|", ":"]
const prohibitedChars = [".",",","/","-","_","(",")","+","?","!","<",">","[","]","{","}", '"', "'", ":", ";", "|", ":"]

function generator(text){
    let temp = text.split('')
    temp = temp.filter((char) => !prohibitedChars.includes(char))
    temp = temp.join('')
    console.log(temp)
    temp = temp.replaceAll('\n', ' ')
    
    // ! dictionary items
    // ? [first word, second word, times appeared first word, times appeared combination, probably]
    // ? [first word, second word, times appeared combination, probably]

    temp = temp.split(' ')

    for (let i = 0; i < temp.length - 1; i++){
        let filtering = dictionary.filter((dictionaryElement) => dictionaryElement[0] === temp[i] && dictionaryElement[1] === temp[i + 1])
        if (filtering.length === 0) {
            dictionary.push([temp[i], temp[i + 1], 1]) 
        } else {
            let existingValue = dictionary.map((dictionaryElement) => dictionaryElement[0] === temp[i] && dictionaryElement[1] === temp[i + 1])
            let index = existingValue.indexOf(true)
            dictionary[index][2]++
            console.log(existingValue)
        }
    }

    console.log(dictionary)


}

generator(input)

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
