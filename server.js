import express from 'express';
import multer from 'multer';
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

import {merge} from './testpdf.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({dest: 'uploads/'})
const app = express()
const port = 3000
app.use('/static', express.static('public'));

app.get(
    '/',
    (req, res) => {res.sendFile(path.join(__dirname, 'template/index.html'))})

app.post('/merge', upload.array('pdfs', 5),async function(req, res, next) {
  console.log(req.files);
  const filePaths = req.files.map(file => file.path);
  let d =await merge(filePaths);
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
})

app.listen(
    port,
    () => {
        console.log(`Example app listening on port https://localhost:${port}`)})
