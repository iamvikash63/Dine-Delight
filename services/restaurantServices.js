import { saveToStorage,getfromStorage } from "../utils/storage.js";

export async function loadRestaurants(){
    let data;
    if(!data){
        const res=await fetch ("restaurants.json");
        data = await res.json();
        saveToStorage("restaurants",data);
    }
    return data;
}

export function getRestaurantById(id,restaurants){
    return restaurants.find((r)=>String(r.id)===String(id));
}