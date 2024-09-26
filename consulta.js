const fs = require('fs');
const path = require('path');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

DictionaryPath = path.join(__dirname, 'dictionary.json')
const dictionary = readJSON(DictionaryPath)
// console.log(dictionary)


// ! DIGITE O PROMPT AQUI

// ! ----------------------------------------------------------------
const prompt = 'livro'
// ! ----------------------------------------------------------------
// ?
const temperature = 3 // Padrão: 3
// ?

// SingleCall(prompt)
MultiCalls(50, prompt)

function SingleCall(prompt) {
    let search = dictionary.filter((parameter) => parameter[0] === prompt)

    search = search.sort((a, b) => {return b[2] - a[2]})

    console.log(search)

    let quantity = 0 
    search.forEach((x) => quantity += x[2])
    console.log(quantity)



    if (search.length >= 3){
        console.log(
            `
            Resultados mais prováveis:
            1º ${search[0][1]} - ${((search[0][2]/quantity)* 100).toFixed(5)}%
            2º ${search[1][1]} - ${((search[1][2]/quantity)* 100).toFixed(5)}%
            3º ${search[2][1]} - ${((search[2][2]/quantity)* 100).toFixed(5)}%
        `)
    } else if (search.length === 2) {
        console.log(
            `
            Resultados mais prováveis:
            1º ${search[0][1]} - ${((search[0][2]/quantity)* 100).toFixed(5)}%
            2º ${search[1][1]} - ${((search[1][2]/quantity)* 100).toFixed(5)}%
        `)
    } else if (search.length === 1) {
        console.log(
            `
            Resultado mais provável:
            1º ${search[0][1]} - ${((search[0][2]/quantity)* 100).toFixed(5)}%
        `)
    }
    
}


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

function MultiCalls(quantity, prompt) {
    let phrase = [capitalizeFirstLetter(prompt)]
    prompt = prompt
    for (let i = 0; i < quantity; i++){
        if(i === 0) {
            prompt = prompt
        } else {
            prompt = phrase[phrase.length - 1]
        }
            

        let search = dictionary.filter((parameter) => parameter[0] === prompt)

        search = search.sort((a, b) => {return b[2] - a[2]})

        search = search.filter((parameter) => phrase.indexOf(parameter[1]) === -1)


        let random
        if(search.length >= temperature){
            random = parseInt(Math.random() * temperature)
        } else if (search.length >= 1) {
            random = parseInt(Math.random() * search.length)
        } else {
            random = 0
        }
 
        if(search.length === 0) break

        if(i === 0) {
            phrase.push(search[random][1].toLowerCase())
        } else {
            phrase.push(search[random][1].toLowerCase())
        }


        console.log(
            `
            >------------------------<
            >All right!
            >Word generated: "${search[random][1].toLowerCase()}"
            >Iterator: ${i}
            >Single test called
            >------------------------<
            `
            )
        SingleCall(prompt)
    }

    console.log((phrase.join(' ')))
}
