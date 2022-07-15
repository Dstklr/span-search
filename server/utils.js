var fs = require('fs');
const { resolve } = require('path');
var JSONbig = require('./../client/node_modules/json-bigint');


async function getJson(readable) {
    // readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
        data += chunk;
    }
    return data;
}

const readJson = async (path) => {
    let spansJson = '';
    try {

        const readableStream = fs.createReadStream(path, 'utf-8');

        const response = await getJson(readableStream);

        try {
            const parsed = JSONbig.parse(response)
            return parsed;

        } catch (error) {
            console.log('failed parsing', error);
            return [];
        }

        // readableStream.on('data', (chunk) => {
        //     spansJson += chunk;
        // });

        // readableStream.on('end', () => {
        //     console.log('All Done');
        //     try {
        //         const parsed = JSONbig.parse(spansJson)
        //         resolve(parsed);

        //     } catch (error) {
        //         console.log('failed parsing', error);
        //         return [];
        //     }
        // });

        // readableStream.pipe()

        // readableStream.on('error', function (error) {
        //     console.log(`error: ${error.message}`);
        // })

        // readableStream.on('data', (chunk) => {
        //     console.log(chunk);
        // })

        // const response = await fs.read(path, 'utf8', function (err, data) {
        //     if (err) {
        //         console.log('failed reading json file', err);
        //         throw err
        //     };
        //     return JSONbig.parse(data);
        // });


    } catch (error) {
        console.log('error occured parsing/reading json file', err);
        return [];
    }

}

module.exports = readJson;
