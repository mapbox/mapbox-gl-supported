'use strict';
const fs = require('fs');
const test = require('tap').test;
const spawn = require('child_process').spawnSync;

test('Flow types', (t) => {
    const expected = fs.readFileSync(`${__dirname}/flow.expected.txt`, 'utf8');
    const result = spawn('npx', [
        'flow',
        '--color=never',
        `${__dirname}/flow.input.js.flow`
    ], {encoding: 'utf8'});
    const actual = result.stdout;
    if (process.env.UPDATE) {
        fs.writeFileSync(`${__dirname}/flow.expected.txt`, actual);
    }
    t.deepEqual(actual, expected);
    t.end();
});


