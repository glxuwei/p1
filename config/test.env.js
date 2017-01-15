const prod = require('./prod.dev');
module.exports = Object.assign({}, prod, {
	NODE_ENV: '"testing"',
});