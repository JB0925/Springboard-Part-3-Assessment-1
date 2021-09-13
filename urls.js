// Import the necessary dependencies and modules
const { default: axios } = require("axios");
const fs = require("fs");

// Read the file and return an array of urls from the string,
// splitting at the newline characters.
const findAndReadFile = path => {
    const text = fs.readFileSync(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
    return text.split('\n');
};

// Try to get HTML from a url using Axios.
// Catch the error if the url does not exist.
const getDataFromUrl = async(url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        console.log(`Could not get data from ${url}.`)
        return `Could not get data from ${url}.`;
    }
};

// Use regular expressions to parse the urls from 
// the original array of urls. These will be used
// as the file names to write to later on.
const parseUrls = urls => {
    const startPattern = /https?:\/\//;
    const endPattern = /\/[\W\w]+/;
    let urlArray = [];

    for (let url of urls) {
        if (url !== ' ') {
            url = url.replace(startPattern, "").replace(endPattern, "")
            urlArray.push(url);
        }
    }
    return urlArray;
}

// A simple wrapper for writing to a file
// Takes the data from the Axios call to the url
// (or the error message) and the file name, 
// which is a domain name taken from "parseUrls".
const writeHtmlToFile = (data, url) => {
    fs.writeFile(url, data, "utf8", (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`Wrote to file ${url}.`);
    });
};


// A wrapper for the above functions.
// Get the urls from the input file.
// Parse the urls for the domain name from each.
// For each url, we get the data from it via Axios,
// and then we write the data to a new file whose
// name comes from the "parseUrls" function.
const wrapper = path => {
    let urls = findAndReadFile(path).slice(0, 4);
    let fileNames = parseUrls(urls);
    
    for (let i = 0; i < urls.length; i++) {
        getDataFromUrl(urls[i])
        .then(data => writeHtmlToFile(data, fileNames[i]));
    };
    return;
};

// Check for errors in how the program is called from the command line.
if (process.argv.length !== 3) {
    let msg = process.argv.length < 3 ? "Too few arguments." : "Too many arguments.";
    console.log(msg);
    process.exit(1);
};

// Get command line argument for file path
// and call wrapper to start the execution of the program.
const path = process.argv[2];
wrapper(path);