// 完成js和xml的交互
import axios from 'axios';

const saveToXML = (arr) => {// 记得要传来一个数组
    const o = {
        fragments: {
            fragment: arr
        }
    }
    axios.post('http://localhost:1111/xml', `data=${JSON.stringify(o).replace(/&/g, '!!tag:amp!!')}`, {
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
        return res.data.fragments.fragment;
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

