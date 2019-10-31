// 完成js和xml的交互
import XMLLite from '@lite-js/xml/indexBrowser';
import js2dom from '@lite-js/xml/lib/js2dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
var js2xmlparser = require('js2xmlparser');
const saveToXML = (codeArr) => {// 记得要传来一个数组

    const xml = js2xmlparser.parse('fragments', { fragment: codeArr })
    console.log(xml);
    axios.post('http://localhost:1111/xml',{
        
    })
}
const getDomInnerValue = (dom, name) => {

}
const getBadges = bgs => {
    let list = [];
    for (let i = 0; i < bgs.length; i++) {
        list.push(bgs[i].innerHTML);
    }
    return list.join(',');
}
async function loadXML() {
    try {

        let res = await axios.get('http://localhost:1111/xml');
        console.log(res);
        const fragmentsArr = [];
        const js = XMLLite.xml2js(res.data);
        const dom = js2dom(js);

        const fragments = dom.getElementsByTagName('fragments')[0].getElementsByTagName('fragment');

        for (let i = 0; i < fragments.length; i++) {
            const item = fragments[i];
            const title = item.getElementsByTagName('title')[0].innerHTML;
            const text = item.getElementsByTagName('text')[0].innerHTML;
            const language = item.getElementsByTagName('language')[0].innerHTML;
            const badges = getBadges(item.getElementsByTagName('badges')[0].getElementsByTagName('badge'));
            const fragment = {
                id: i,
                title,
                badges,
                text,
                language,
            }
            fragmentsArr.push(fragment);
        }

        return fragmentsArr;
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

