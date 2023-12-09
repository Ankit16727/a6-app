import { getToken } from "./authenticate";

// Add to favourites
export async function addToFavourites(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `JWT ${getToken()}` 
      }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
      return data;
    }else{
      return [];
    } 
}

// Remove from favourites

export async function removeFromFavourites(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `JWT ${getToken()}` 
      }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
      return data;
    }else{
      return [];
    } 
}


// Get all the favourites

export async function getFavourites() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: "GET",
      headers: {
        "Authorization": `JWT ${getToken()}` 
      }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
      return data;
    }else{
      return [];
    } 
}


// Add to history
export async function addToHistory(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `JWT ${getToken()}` 
      }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
      return data;
    }else{
      return [];
    } 
}


// Remove from history

export async function removeFromHistory(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `JWT ${getToken()}` 
      }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
      return data;
    }else{
      return [];
    } 
}


// Get all the history

export async function getHistory() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: "GET",
      headers: {
        "Authorization": `JWT ${getToken()}` 
      }
    });
  
    const data = await res.json();
  
    if(res.status === 200){
      return data;
    }else{
      return [];
    } 
}








