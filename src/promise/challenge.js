let XMLHttpTequest = require('xmlhttprequest').XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpTequest(); //genera la referencia a la insatancia
        xhttp.open('GET', url_api, true)  //.open() hace un llamado a una url, 
        // (##,##,##) el primer parametro indica el tipo de peticion a realizar, 
        //            el segundo es la url a donde realizar la peticion
        //            el tercero indica si se desea activar el asyncronismo en la peticion, por default el valor es true
        xhttp.onreadystatechange = (() => { // un manejador de eventos que se dispara con el atributo "readyState"
            if (xhttp.readyState === 4) {//valida que "readyState" se encuentre en el estado 5 del proceso d epeticion, que es "done", que indica que la operacion a sido completada
                if (xhttp.status === 200) {//valida que el status de la peticion es 200, es decir, que se ejecuto correctamemte
                    resolve(JSON.parse(xhttp.responseText))
                } else {
                    const error = new Error(`Error in ${url_api}`)
                    reject(error)
                }
            }
        })
        xhttp.send();
    });
}

// fetchData(API)
//     .then(response1 => {
//         fetchData(API + response1.results[0].id)
//             .then(response2 => {
//                 fetchData(response2.origin.url)
//                     .then(response3 => {
//                         console.log(response1.info.count)
//                         console.log(response2.name)
//                         console.log(response3.dimension)
//                     })
//                     .catch(err => console.log(err))
//             })
//             .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))

fetchData(API)
    .then(data => {
        console.log(data.info.count)
        return fetchData(`${API}${data.results[0].id}`)
    })
    .then(data => {
        console.log(data.name)
        return fetchData(data.origin.url)
    })
    .then(data => {
        console.log(data.dimension)
    })
    .catch(err => console.log(err))

//module.exports = fetchData; //Asi se impoirta en nodejs ya que aun usa common js en ves del import o export default