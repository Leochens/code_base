import React, { useState, useEffect } from 'react';
import utils from '../../utils/xml';

async function test(){
    const dom = await utils.loadXML();
    console.log(dom);

}
test();
const Test = props => {


    return (
        <div>
            hello
        </div>
    )
}



export default Test