const promise = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve('this is my resolved data');
        //reject('this is my resolved data');
    }, 1600)
    
});
console.log('before');
promise.then((data) => {
    console.log("data:"+data );
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve('this is my new promise');
            //reject('this is my resolved data');
        }, 1600)
    })
}).then((str) => {
    console.log('Does this run ?',str);
}).catch((error) => {
    console.log('Error occured');
});

console.log('after resolved');