import React, { useState, useEffect } from 'react';
import utils from '../../utils/xml';

async function test() {
    const dom = await utils.loadXML();
    console.log(dom);
    const d = JSON.parse(JSON.stringify(dom));
    console.log(d);
    d.fragments.fragment[1].text = "if(x === 0 &&&&& y === 1) ";
    utils.saveToXML(d);
}
// test();
const Test = props => {


    return (
        <div>
            hello
        </div>
    )
}



export default Test