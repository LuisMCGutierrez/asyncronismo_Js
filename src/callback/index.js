function sum(num1, num2) {
    return num1 + num2;
}
function calc(num1, num2, callback) {
    return callback(num1, num2)
}
console.log(calc(2, 1, sum))

function date(callback) {
    console.log(`nueva fecha de primera funcion ${new Date}`)
    setTimeout(() => {
        let date = new Date;
        callback(date)
    }, 3000);
    console.log(`nueva fecha de primera funcion 2 ${new Date}`)
}

function printDate(date) {
    console.log(`fecha desde funcion mandada a llamar como callback ${date}`)
}
date(printDate)