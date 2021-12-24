const exec = require('child_process').exec;

function main () {
    const file = process.argv[2];

    const child = exec(`node ${file}\\${file}.js`,
    function (error, stdout, stderr) {
    
        console.log(`${file} results:\n` + stdout);
        
        if (stderr) {
            console.log('stderr: ' + stderr);
        }
        
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

}

main()