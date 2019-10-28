import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XMLLite from '@lite-js/xml';
import json2xml from '../../utils/json2xml';
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


const testxml = () => {
    axios.get('/test.xml').then(res => {
        console.log(res.data);
        parser.parseString(res.data, function (err, result) {
            console.dir(result);
            console.log('Done');
            console.log(err);
        });
    }).catch(err => console.log(err));
}


const testxml2 = () => {
    axios.get('/test.xml').then(res => {
        console.log(res.data);
        const x = XMLLite.xml2js(res.data);
        console.log(x);
        const y = XMLLite.js2xml(x,{beautify:true});
        console.log(y);
    }).catch(err => console.log(err));

}
testxml();
testxml2();


const Test = props => {


    return (
        <div>
            hello
        </div>
    )
}



export default Test