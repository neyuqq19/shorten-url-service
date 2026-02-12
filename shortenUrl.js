import { nanoid } from "nanoid";


isHTTPUrl("hello");

export function shorten(){
    return nanoid(6);
}

export function isHTTPUrl(url){
    try{
        new URL(url);
        return true;
    }
    catch(error){
        return false;
    }
}

export function displayWithoutAccessCount(data){
    let object;
    if(data){
        object = {id: data.id, url: data.url, shortCode: data.shortCode, createdAt: data.createdAt, updatedAt: data.updatedAt};
    }
    return object;
}