const fs = require('fs');
exports.get=function (key) {
    var text = fs.readFileSync('../secret.json', 'utf8');
    var js = JSON.parse(text);
    if(js.hasOwnProperty(key)){
        return js[key];
    }else {
        return null;
    }
};

exports.set = function (k, value) {
    var text = fs.readFileSync('../secret.json', 'utf8');
    var js = JSON.parse(text);
    if (js.hasOwnProperty(k)) {
        js[k] = value;
        fs.writeFileSync('../secret.json',JSON.stringify(js));
    }
};

exports.random=function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};