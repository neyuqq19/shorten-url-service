import express from 'express';
import mongoose from 'mongoose';
import { add, deleteUrl, update, get } from './models/Url.js';
const app = express();

const PORT = 1903;

mongoose.connect('mongodb://127.0.0.1:27017/urlShortenData')
    .then(() =>console.log('Da ket noi thanh cong'))
    .catch(err => console.err('Loi ket noi'));

app.use(express.json());

app.get('/shorten/:content', (req, res) =>{
    get(req.params.content);
})

app.post('/shorten', (req, res) =>{
    add(req.body.url);
})

app.put('/shorten/:content', (req, res) =>{
    update(req.params.content, req.body.url);
})

app.delete('/shorten/:content', (req, res) =>{
    deleteUrl(req.params.content);
})

app.get('/shorten/:content/stats', (req,res) =>{
    get(req.params.content);
})


app.listen(PORT, () =>{
    console.log(`Server đang chạy với Port ${PORT}`);
})