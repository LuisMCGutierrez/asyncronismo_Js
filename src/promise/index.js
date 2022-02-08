const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve('holiiiiii')
        } else {
            reject('Ups!')
        }
    })
}

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.log(err))


const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve('holiii despues de 3 seg')
            }, 3000);
        } else {
            const error = new Error('Uuuuups!')
            reject(error)
        }
    });
}

somethingWillHappen2()
    .then(response => console.log(response))
    .then(() => console.log("holi del 2do then"))
    .catch(err => console.log(err))

Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
        console.log('Array results', response)
    })
    .catch(err => {
        console.error(err)
    })