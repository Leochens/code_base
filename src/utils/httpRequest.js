import axios from 'axios';

export default function httpRequest(options) {
    const { type, url, data } = options;
    return new Promise((resolve, reject) => {
        if (type == 'get') {
            axios.get(url, {
                params: data
            }).then(res => {
                console.log("res", res)

                resolve(res);
            }).catch(err => {
                console.error("HTTPRequest GET ERR", err);
                reject(err);
            })
        } else { // post
            axios.post(url, data).then(res => {
                resolve(res);
            }).catch(err => {
                console.error("HTTPRequest POST ERR")
                reject(err);
            })
        }
    })
}