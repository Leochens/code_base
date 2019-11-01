var express = require('express');
var multer = require('multer')
var bodyParser = require('body-parser')
var xml2js = require('xml2js');;
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();
var app = express();
var fs = require('fs');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    next();
});
const getBaseData = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, res) => {
            if (err) {
                console.log(err);
                reject('read file error');
            }
            console.log(parser.parseString(res, function (err, obj) {
                if (err) console.log(err);
                else {
                    console.log(obj)

                    resolve(obj);
                };
            }));
        })
    })
}
const xml2Escape = function (xml) {
    return xml.replace(/!!tag:amp!！/g, '&');
}
app.get('/xml', function (req, res) {
    getBaseData('xml/xml.xml').then(result => {
        res.send(result);
    }
    ).catch(e => {
        console.log(e);
        res.send({
            success: false,
            message: e
        })
    });
})
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/xml', function (req, res, next) {
    //data直接是json即可 前端只负责处理js
    console.log(req.body);
    let obj = req.body.data;
    console.log(obj);
    if (!obj) return res.send({ success: false, message: "obj 参数错误" });
    obj = obj.replace(/!!tag:amp!!/g, '&');
    console.log("clear后", obj);
    obj = JSON.parse(obj);
    if (!Array.isArray(obj.fragments.fragment)) return res.send({ success: false, message: "fragments 需要是数组" });

    // 再进行一次特殊字符转义  自动转义？？？
    // obj.fragments.fragment = obj.fragments.fragment.map(item => {
    //     console.log(item);
    //     return {
    //         ...item,
    //         title: [xml2Escape(item.title.pop())],
    //         text: [xml2Escape(item.text.pop())]
    //     }
    // })
    // 进行xml构造
    var xml = builder.buildObject(obj);
    // 将构造好的xml写入文件
    fs.writeFile('xml/xml.xml', xml, { flag: "w" }, function (err) {
        if (err) {
            console.log(err);
            res.send({ success: false, message: "写入文件失败" })
        }
        console.log('packed xml', xml);
        res.send({ success: true, message: "上传成功,已成功转化为xml", xml, objFromFront: obj });
    })
});

const port = 1111;
app.listen(port, () => console.log("服务器运行在端口" + port));