const http = require('http');
const router = require('./router');

http.createServer((req,res) => {
    //const {content, contentType, statusCode, asynchronous} = router(req.url, res);
    
    const next = (statusCode, contentType, content) => {
        res.writeHead(statusCode,{'Content-Type': contentType });
        res.end(content);
    }
    router(req.url, next);    
    
    //if(!asynchronous) res.end(content);
}).listen(3000, () => { console.log('server is running on http://localhost:3000/') });