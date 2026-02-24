export function saveToStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}

export function getfromStorage(key){
    return JSON.parse(localStorage.getItem(key) || "null");
}