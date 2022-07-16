var fs = require('fs');
var JSONbig = require('json-bigint');


const getJsonString = (stringToCheck) => {
    try {
        return JSON.parse(stringToCheck);
    } catch (e) {
        return stringToCheck;
    }
}

async function getJson(readable) {
    let data = '';
    for await (const chunk of readable) {
        data += chunk;
    }
    return data;
}

const readJson = async (path) => {
    try {
        const response = await getJson(fs.createReadStream(path, 'utf-8'));
        if (!response) {
            return '';
        }
        return JSONbig.parse(response)
    } catch (error) {
        console.log('error occured parsing/reading json file', err);
        return [];
    }
}

module.exports = { readJson, getJsonString };
