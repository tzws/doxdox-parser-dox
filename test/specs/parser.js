const assert = require('assert');
const fs = require('fs');

const parser = require('../../index');

describe('doxdox parser', () => {

    ['dox', 'facade'].forEach(file => {

        it(`run dox parser on ${file}.js`, () => {

            const contents = fs.readFileSync(`./test/fixtures/${file}.js`, 'utf8');

            const methods = parser(contents, `${file}.js`);

            // fs.writeFileSync(path.join(__dirname, `../fixtures/${file}.json`), JSON.stringify(methods, true, 4));

            const data = fs.readFileSync(`./test/fixtures/${file}.json`, 'utf8');

            assert.deepEqual(methods, JSON.parse(data));

        });

    });

});
