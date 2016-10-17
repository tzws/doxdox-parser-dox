const assert = require('assert');
const fs = require('fs');
const path = require('path');

const parser = require('../../index');

describe('doxdox parser', () => {

    ['dox', 'facade'].forEach(file => {

        it(`parser on ${file}.js`, done => {

            fs.readFile(path.join(__dirname, `../fixtures/${file}.js`), 'utf8', (err, contents) => {

                if (err) {

                    throw new Error(err);

                }

                const methods = parser(contents, `${file}.js`);

                // fs.writeFileSync(path.join(__dirname, `../fixtures/${file}.json`), JSON.stringify(methods, true, 4));

                fs.readFile(path.join(__dirname, `../fixtures/${file}.json`), 'utf8', (err, data) => {

                    if (err) {

                        throw new Error(err);

                    }

                    assert.deepEqual(methods, JSON.parse(data));

                    done();

                });

            });

        });

    });

});
