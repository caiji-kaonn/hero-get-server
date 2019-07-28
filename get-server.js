// 以get方式发送--在这里编写，index和add页面数据
const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');
const server = http.createServer();
server.listen(8080, '172.20.10.2', () => {
    console('服务器已启用，可通过 http://172.20.10.2:8080 访问')
})
server.on('request', (req, res) => {
    console.log('请求进来了');
    if (req.url.startsWith('/assets')) {
        if (req.url.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        fs.readFile('.' + req.url, (err, data) => {
            if (err) console.log(err);
            res.end(data);
        })
    } else {
        // 获取url后面参数并把参数变成对象
        let result = url.parse(req.url, true)
        if (req.url === '/views/index.html') {
            fs.readFile(_dirname + '/data/getAllheros.json', 'utf-8', (err, data) => {
                if (err) console.log(err);
                let arr = JSON.parse(data);
                let html = template(_dirname + '/views/index.html', {
                    arr
                });
                res.end(html);
            })
        } else {
            // 实现新增
            if (req.url === '/views/add.html') {
                fs.readFile(_dirname + '/views/add.html', (err, data) => {
                    if (err) console.log(err);
                    res.end(data);
                })
            }
            //  写以get方式发送数据到json
            if (result.pathname === '/addHero' && req.method === 'GET') {
                fs.readFile('./data/getAllheros.json', (err, data) => {
                    if (err) console.log(err);
                    let arr = JSON.parse(data);
                    // 添加新数据的id
                    let id = 0;
                    arr.forEach(e => {
                        if (e.id > id) {
                            id = e.id
                        }
                    });
                    result.query.id = id + 1;
                    arr.push(result.query);
                    let jsonStr = JSON.stringify(arr);
                    fs.writeFile('./data/getAllheros.json', jsonStr, 'utf-8', (err, data) => {
                        if (err) console.log(err);
                        res.end(JSON.stringify({
                            code: 200,
                            msg: '操作成功'
                        }))
                    })
                })
            }


        }
    }


})