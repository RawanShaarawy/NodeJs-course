const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const fileRouter = express.Router();

fileRouter.get('/', async (req, res)=>{
    let files = await fs.readdir('./assets')
    res.send(files)
})
fileRouter.get('/:fileName', (req, res)=>{
    let filePath = path.join(__dirname, 'assets',req.params.fileName);
    res.sendFile(filePath);
})


module.exports = fileRouter;