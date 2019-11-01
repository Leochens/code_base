// 完成js和xml的交互
import axios from 'axios';
var js2xmlparser = require('js2xmlparser');

const transferFlag = function (obj) {
    debugger
    return JSON.parse(JSON.stringify(obj).replace('!!tag:amp!!', '&'));
}
const saveToXML = (obj) => {// 记得要传来一个数组
    axios.post('http://localhost:1111/xml', `data=${JSON.stringify(obj)}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}
async function loadXML() {
    try {
        let res = await axios.get('http://localhost:1111/xml');
        return res.data;
    } catch (err) {
        console.error(err)
        return null;
    }
}

const addChild = () => {

}
const testxml2 = () => {


}

const utils = {
    loadXML,
    saveToXML
}
export default utils

