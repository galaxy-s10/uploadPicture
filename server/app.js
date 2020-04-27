const express = require('express')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {

        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

const app = express()
app.use(express.static(path.join(__dirname, 'uploads')));

app.post('/profile', upload.single('avatar'), function (req, res) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    console.log(req.file.path)
    res.json({ file: req.file })
})

app.use('/', function (req, res) {
    console.log('ssssssssss')
    res.json({ code: 1 })
})


app.listen('3000', function () {
    console.log('running......')
})