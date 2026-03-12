import { saveToStorage} from "../utils/storage.js";

export async function loadRestaurants(){
    let data;
    if(!data){
        const res=await fetch ("restaurants.json");
        const raw = await res.json();
        data = Array.isArray(raw) ? raw : (raw?.restaurants || []);
        saveToStorage("restaurants",data);
    }
    return data;
}

export function getRestaurantById(id,restaurants){
    return restaurants.find((r)=>String(r.id)===String(id));
}
