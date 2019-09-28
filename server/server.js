const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const fallback = require('express-history-api-fallback');

const root = path.resolve(__dirname, '..', 'dist');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(root));

app.use(fallback(path.resolve(root, 'index.html'), {root: root}));

// const db = require('../models/index');
// const PERMISSIONS = require('../config/db.config');

// db.Permission.create({
//     name: PERMISSIONS.READ
// }).catch((err) => {
//     return;
// });

// db.Permission.create({
//     name: PERMISSIONS.WRITE
// }).catch((err) => {
//     return;
// });

// db.Permission.create({
//     name: PERMISSIONS.USERS_MODIFY
// }).catch((err) => {
//     return;
// });

const Middlewares = require('../middlewares/index');
const Controllers = require('../controllers/index');

app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to API!', })
});
app.post('/api/signup', [Middlewares.SignUp.checkBodyExist, Middlewares.SignUp.checkRoleExist],
    Controllers.User.createUser);
app.post('/api/login', Controllers.User.login);
app.get('/api/auth', [Middlewares.Auth.isAuth, Middlewares.Auth.determinePermissions],
    Controllers.User.auth);
app.get('/api/logout', [Middlewares.Auth.isAuth, Middlewares.Auth.determinePermissions],
    Controllers.User.logout);
app.post('/api/create/item', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkTypeExist, Middlewares.Item.checkDistrictExist],
    Controllers.Item.createItem);
app.post('/api/items', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkTypeOrderExist, Middlewares.Item.checkDistrictOrderExist],
    Controllers.Item.getItems);
app.post('/api/item', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkIDExist,],
    Controllers.Item.getItem);
app.put('/api/update/item/type', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkIDExist, Middlewares.Item.checkTypeExist],
    Controllers.Item.updateType);
app.put('/api/update/item/work', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkIDExist, Middlewares.Item.checkWorkExist],
    Controllers.Item.updateWork);
app.put('/api/update/item/district', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkIDExist, Middlewares.Item.checkDistrictExist],
    Controllers.Item.updateDistrict);
app.put('/api/update/item/address', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkIDExist, Middlewares.Item.checkAddressExist],
    Controllers.Item.updateAddress);
app.put('/api/update/item/note', [Middlewares.Item.checkBodyExist, Middlewares.Item.checkIDExist, Middlewares.Item.checkNoteExist],
    Controllers.Item.updateNote);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(root, 'index.html'));
});

const http = require('http');
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);