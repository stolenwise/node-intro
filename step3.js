const fs = require('fs');
const axios = require('axios');

function handleOutput(content, outPath) {
    if (outPath) {
        fs.writeFile(outPath, content, 'utf8', function(err) {
            if (err) {
                console.error(`Couldn't write ${outPath}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(content);
    }
}


function cat(path) {
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.log("ERROR:", err);
        process.kill(1);
        return;
    }
    handleOutput(data, outPath);
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

let outPath;
let sourcePath;

if (process.argv[2] === '--out') {
    outPath = process.argv[3];      // e.g. new.txt
    sourcePath = process.argv[4];   // e.g. one.txt or http://xyz.com
  } else {
    sourcePath = process.argv[2];   // if no --out
  }
  
  // Decide what to read
  if (sourcePath.startsWith('http')) {
    webCat(sourcePath, outPath);
  } else {
    cat(sourcePath, outPath);
  }

