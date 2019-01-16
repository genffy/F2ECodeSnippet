/**
 * Created by genffy on 16/7/15.
 */
var Readable = require('stream').Readable;
var fs = require('fs');

var rs = Readable();

/*
rs.push('beep ');
rs.push('boop\n');
rs.push(null);

rs.pipe(process.stdout);
rs.pipe(fs.createWriteStream([__dirname, 'demo.txt'].join('/'), 'utf-8'));
*/

var c = 97 - 1;
rs._read = function () {
    if (c >= 'z'.charCodeAt(0)) return rs.push(null);
    setTimeout(function () {
        rs.push(String.fromCharCode(++c));
    }, 100);
};
rs.pipe(process.stdout);

// rs.pipe(fs.createWriteStream([__dirname, 'demo.txt'].join('/'), 'utf-8'));

process.on('exit', function () {
    console.error('\n_read() called ' + (c - 97) + ' times');
});
process.stdout.on('error', function(){
    console.log(arguments)
    process.exit()
});