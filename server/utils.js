var fs = require('fs');
var JSONbig = require('json-bigint');

export default readJson = (path) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        console.log('failed reading json file', err);
        throw err
    };
      return JSONbig.parse(data);
    });
  }