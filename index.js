const fs = require('fs');
const {
    emitter,
    main
} = require('./trading');

emitter.on('error', console.error);
emitter.on('log', console.log);
emitter.on('success', log => {
    fs.appendFile('buy.log', logMessage, err => {
        if (err) {
            console.log('An error has occured');
            console.log(err);
            return;
        }
    });
});
emitter.on('fail', err => {
    fs.appendFile('buy.log', err.msg, err => {
        if (err) {
            console.log(err);
        }
    });
})

main();
