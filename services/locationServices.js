export function getCurrentLocation(){
    return new Promise((resolve,reject)=>{
        if(!navigator.geolocation){
            reject("Location Not Supported");

        }

        navigator.geolocation.getCurrentPosition((position)=> resolve(position.coords),
        ()=>reject("Permission denied"));
    });
}

export async function reverseGeocode(lat,lng) {
    const res=await fetch (
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return(
        data.address.suburb||data.address.city||data.address.town||data.address.village||"Location Found"
    );
}