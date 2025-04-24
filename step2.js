const fs = require('fs');
const axios = require('axios');


function cat(path) {
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.log("ERROR:", err);
        process.kill(1);
        return;
    }
    console.log(data);
})
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.error(`Error fatching ${url}:`)
        console.error("", err.message);
        process.exit(1);
    }
    }

 
    const path = process.argv[2];
    if (path.startsWith('http' || 'www')) {
        webCat(path);
    } else {
        cat(path);
    }
    