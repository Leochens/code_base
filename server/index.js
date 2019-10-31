var fs = require('fs');
var express = require('express');
var multer = require('multer')

var app = express();
const storage = multer.diskStorage({
    destination: 'xml/',
    filename(req, file, cb) {
        cb(null, 'xml.xml');
    }
});
var upload = multer({ storage });
const getBaseData = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, res) => {
            if (err) {
                console.log(err);
                reject('read file error');
            }
            // var data = JSON.parse(res);
            resolve(res);
        })
    })
}
// getBaseData('xml/xml.xml').then(res => console.log(res)).catch(e => console.log(e));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    next();
});
app.get('/xml', function (req, res) {

    getBaseData('xml/xml.xml').then(result => {

        console.log(result);
        res.send(result);
    }
    ).catch(e => {
        console.log(e);
        res.send({
            success:false,
            message:e
        })
    });

    // res.send({file:})
})
app.post('/', upload.single('file'), function (req, res, next) {
    console.log(req.file);
    console.log(req.body);
    res.send({ success: true, message: "上传成功", filename: req.file.filename });
});


app.listen(1111);