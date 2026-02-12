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
    
}