let XMLHttpTequest = require('xmlhttprequest').XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpTequest(); //genera la referencia a la insatancia
    xhttp.open('GET', url_api, true)  //.open() hace un llamado a una url, 
    // (##,##,##) el primer parametro indica el tipo de peticion a realizar, 
    //            el segundo es la url a donde realizar la peticion
    //            el tercero indica si se desea activar el asyncronismo en la peticion, por default el valor es true
    xhttp.onreadystatechange = function (event) { // un manejador de eventos que se dispara con el atributo "readyState"
        if (xhttp.readyState === 4) {//valida que "readyState" se encuentre en el estado 5 del proceso d epeticion, que es "done", que indica que la operacion a sido completada
            if (xhttp.status === 200) {//valida que el status de la peticion es 200, es decir, que se ejecuto correctamemte
                callback(null, JSON.parse(xhttp.responseText)) //por norma en callback, los aprametros de la funcion son primero el error y en segundo la respuestadel servicio si fue correcta
                //                                               la respuesta de uns ervicio siempre es en cadena de texto, la cual se encuentra en "responseText", se debe parsear al tipo de respuesta que se sabe que el servicio entrega, en este caso la transdformamos en un JSON
            } else {
                const error = new Error(`Error in ${url_api}`)
                return callback(error, null)
            }
        }
    }
    xhttp.send();
}

fetchData(API, function (error1, data1) {
    if (error1) {
        return console.log(error1)
    } else {
        fetchData(API + data1.results[0].id, function (error2, data2) {
            if (error2) {
                return console.log(error2)
            } else {
                fetchData(data2.origin.url, function (error3, data3) {
                    if (error3) {
                        return console.log(error2)
                    } else {
                        console.log(data1.info.count)
                        console.log(data2.name)
                        console.log(data3.dimension)
                    }
                })
            }
        })
    }
})
