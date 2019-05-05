const express = require('express');
const app = express();
const fileRouter = require('./routers/file');

app.get('/',(req, res)=> res.send('Hello World!'))
app.use('/files',fileRouter);

// app.get('/myFiles',(req,res) => {
//     fs.readdir('./assets',(err,files)=>{
//         res.send(files)
//     })
// })
// app.get('/:fileName', (req, res)=>{
//     let filePath = path.join(__dirname, 'assets',req.params.fileName);
//     res.sendFile(filePath);
// })

app.listen(3000, () => console.log(`Example app listening on port 3000 !`))
