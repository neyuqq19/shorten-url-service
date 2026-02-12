import mongoose, { mongo } from "mongoose";
import { shorten, isHTTPUrl } from "../shortenUrl.js";

let newID = 1;



const UrlSchema = new mongoose.Schema({
    id: {type: String},
    url: {type: String, required: true},
    shortCode: {type: String, default: ''},
    accessCount: {type: Number, default: 0},
    createdAt: {type: String, default: Date().toLocaleString()},
    updatedAt: {type: String, default: Date().toLocaleString()}
})


//Xuất model
const Url = mongoose.model('Url', UrlSchema);

export async function find(shortenUrl){
    let data;
    data = await Url.find({shortCode: shortenUrl});
    if(data){
        return true;
    }
    else return false;
}

export async function add(url){
    if(isHTTPUrl(url) === false){
        return false;
    }

    let shortUrl = shorten(url);
    while(find(shortUrl) === true){
        shortUrl = shorten(url);
    }

    updateNewID();
    
    await Url.create({id: newID, url: url, shortCode: shortUrl, accessCount: 0});
    console.log("Da them vao database");
    return true;
}

export async function update(shortenUrl, newURL){
    if(isHTTPUrl(newURL) === false){
        return -1;
    }

    const data = await Url.find({shortCode : shortenUrl});
    data[0].accessCount++;
    if(!data){
        console.log("Không tồn tại");
        return 0;
    }
    await Url.updateOne({shortCode: shortenUrl}, {url: newURL, accessCount: data[0].accessCount, updatedAt: Date().toLocaleString});
    console.log("Đã update url");
    return 1;
}

export async function get(shortenUrl){
    const data = await Url.find({shortCode: shortenUrl});
    data[0].accessCount++;
    Url.updateOne({shortCode: shortenUrl}, {accessCount: data[0].accessCount});
    return data[0];
}

export async function deleteUrl(shortenUrl){
    if(find(shortenUrl) === false){
        console.log("Không tồn tại");
        return false;
    }

    await Url.deleteOne({shortCode: shortenUrl});
    return true;
}

async function updateNewID(){
    const data = await Url.find().sort({id: -1});
    newID = data[0].id++;
}