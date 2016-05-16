const test = require('tape');
const of = require('./lib/creation/of').default;
const tapDiff = require('tap-diff');

test.createStream()
    .pipe(tapDiff())
    .pipe(process.stdout);

test('of', t => {
    t.plan(2);

    t.equal(typeof of, 'function');

    of(42)({
        next(v) {
            t.equal(v, 42);
        }
    })
});