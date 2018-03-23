'use strict';
let colors = require('colors'),
    express = require('express'),
    app = express();

let reqInfo = ( req ) => {
    if( req != undefined ){
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes() +
            ":" + date.getSeconds() + " " + date.getDate() +
            "." + date.getMonth() + "." + date.getFullYear(); 

        let info = req.method + "  '" + req.url + "' " + time + "   from: '" + req.ip + "' ";
        
        switch(req.method){
            case 'GET':
                console.log(info.bgBlue.black);
            break;
            case 'POST':
                console.log(info.bgGreen.black);
            break;
            case 'PUT':
                console.log(info.bgYellow.black);
            break;
            case 'DELETE':
                console.log(info.bgRed.black);
            break;
            default:
                console.log(info.yellow);
            break;
        };
    }
};

module.exports.reqInfo = reqInfo;