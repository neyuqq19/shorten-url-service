import express from 'express';
import mongoose from 'mongoose';
import { add, deleteUrl, update, get } from './models/Url.js';
import { displayWithoutAccessCount } from './shortenUrl.js';
import { find } from './models/Url.js';
const app = express();

const PORT = 1903;

mongoose.connect('mongodb://127.0.0.1:27017/urlShortenData')
    .then(() =>console.log('Da ket noi thanh cong'))
    .catch(err => console.err('Loi ket noi'));

app.use(express.json());

app.get('/shorten/:content', async (req, res) =>{
    const data = await displayWithoutAccessCount(get(req.body.url));
    if(data){
        res.status(200).json(data);
    }
    else{
        res.status(404).json(message, "Short URL was not found");
    }
})

app.post('/shorten', async (req, res) =>{
    const status = await add(req.body.url);
    if(status){
        res.status(201).json(displayWithoutAccessCount(get(req.body.url)));
    }
    else res.status(400).json(message, "Validation Errors");
})

app.put('/shorten/:content', async (req, res) =>{
    const status = await update(req.params.content, req.body.url);
    if(status === 1){
        res.status(200).json(displayWithoutAccessCount(get(req.body.url)));
    } else if(status === 0){
        res.status(404).json(message, "Short URL was not found");
    } else res.status(400).json(message, "Validation Errors");
})

app.delete('/shorten/:content',async (req, res) =>{
    const status = await deleteUrl(req.params.content);
    if(status){
        res.status(204).json(message, "Short URL was successfully deleted");
    } else res.status(404).json(message, "Short URL was not found");
})

app.get('/shorten/:content/stats',async (req,res) =>{
    if(find(req.params.content)){
        res.status(200).json(get(req.params.content));
    }
    else res.status(404).json(message, "Short URL was not found");
})


app.listen(PORT, () =>{
    console.log(`Server đang chạy với Port ${PORT}`);
})