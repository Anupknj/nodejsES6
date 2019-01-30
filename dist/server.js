'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _localStorageEs = require('local-storage-es6');

var _localStorageEs2 = _interopRequireDefault(_localStorageEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.get('/api/', function (req, res) {
    return res.status(200).send({
        'message': 'working'
    });
});

app.use('/api', _user2.default);

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect('mongodb://localhost/nestemp', { promiseLibrary: require('bluebird') }).then(function () {
    return console.log('connection successful');
}).catch(function (err) {
    return console.error(err);
});

app.use(function (err, req, res, next) {
    res.status(422).send({ app_error: err.message });
});

app.listen(3000, function () {
    console.log("listening on port 3000");
});

module.exports = app;
//# sourceMappingURL=server.js.map