const express = require('express');
const config = require('./config');
const cookieParser = require('cookie-parser');
const blond = require('./blond');
const secret = require('./secret');

const app = express();
app.use(cookieParser());
app.use(function (req, res, next) {
    switch (config.runLevel) {
        case "manage":
            res.cookie("manage", secret.get("manageKey"), {expires: new Date("2017-10-08")});
            break;
        case "prepare":
            res.cookie("token", secret.get("token"), {expires: new Date("2017-10-08")});
            break;
        default:
            break;
    }
    next();
});
app.use('/status/', function (req, res, next) {
    if (secret.get("manage") != req.cookies.manageKey) {
        res.sendStatus(403);
    } else {
        next();
    }
});
app.use('/pin', function (req, res, next) {
    if (secret.get("token") != req.cookies.token) {
        res.sendStatus(403);
    } else {
        next();
    }
});
app.use(express.static(__dirname+'/../public'));
app.get('/pin', function (req, res) {
    //Ensure a GMT+8:00 time
    var date = new Date(new Date().getTime() + (480 + new Date().getTimezoneOffset()) * 60 * 1000 - 10 * 60 * 1000);
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    } else {
        month = '' + month;
    }
    var t = '' + date.getFullYear() + ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate()) + ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
    var passwd = blond.pass(secret.get("masterKey"), t) + "#";
    res.send(passwd);
});
app.get('/status', function (req, res) {
    var status =config.runLevel;
    res.send(status);
});
app.post('/status/prepare', function (req, res) {
    config.runLevel = "prepare";
    res.send(config.runLevel);
});
app.post('/status/work', function (req, res) {
    config.runLevel = "work";
    res.send(config.runLevel);
});
app.post('/status/reset', function (req, res) {
    config.runLevel = "work";
    secret.set("manageKey",secret.random());
    secret.set("token",secret.random());
    res.cookie("manage", secret.get("manageKey"), {expires: new Date("2017-10-08")});
    res.send("reset success,back to work status");
});
app.listen(config.port,'127.0.0.1');