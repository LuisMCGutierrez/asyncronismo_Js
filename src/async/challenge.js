let XMLHttpTequest = require('xmlhttprequest').XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpTequest(); //genera la referencia a la insatancia
        xhttp.open('GET', url_api, true)  //.open() hace un llamado a una url, 
        // (##,##,##) el primer parametro indica el tipo de peticion a realizar, 
        //            el segundo es la url a donde realizar la peticion
        //            el tercero indica si se desea activar el asyncronismo en la peticion, por default el valor es true
        xhttp.onreadystatechange = () => { // un manejador de eventos que se dispara con el atributo "readyState"
            if (xhttp.readyState === 4) {//valida que "readyState" se encuentre en el estado 5 del proceso d epeticion, que es "done", que indica que la operacion a sido completada
                if (xhttp.status === 200) {//valida que el status de la peticion es 200, es decir, que se ejecuto correctamemte
                    resolve(JSON.parse(xhttp.responseText))
                } else {
                    const error = new Error(`Error in ${url_api}`)
                    reject(error)
                }
            }
        }
        xhttp.send();
    })
}

const asyncFetchData = async (url_api) => {
    try {
        const data = await fetchData(url_api)
        const character = await fetchData(`${url_api}${data.results[0].id}`)
        const origin = await fetchData(character.origin.url)

        console.log(data.info.count)
        console.log(character.name)
        console.log(origin.dimension)
    } catch (error) {
        console.log(error)
    }
}

console.log('before')
asyncFetchData(API)
console.log('after')


import fetch from 'cross-fetch';

let API = 'https://rickandmortyapi.com/api/character/';


fetch(API)
    .then(response => response.json())
    .then(data => console.log(data))


const apiData = (url_api) => {
    return fetch(url_api)
        .then(response => response.json())
}

const fetchExample = async (url_api) => {
    try {
        const data1 = await apiData(url_api)
        const character1 = await apiData(`${url_api}${data1.results[0].id}`)
        const origin1 = await apiData(character1.origin.url)
        console.log(data1.info.count)
        console.log(character1.name)
        console.log(origin1.dimension)
    } catch (error) {
        console.log(error)
    }

}

console.log('before')
fetchExample(API)
console.log('after')
