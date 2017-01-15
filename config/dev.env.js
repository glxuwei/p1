const prod = require('./prod.env');
module.exports = Object.assign({}, prod, {
	NODE_ENV: '"development"',
});