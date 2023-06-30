const API_KEY = 'live_LX7mJXc83QGC4f5tWtOOIxOEda61mqaMVhtzLduy6LIXG5Yx24LTeH2QhK427rd6';
const BASE_URL = `https://api.thecatapi.com/v1/`;
const END_POINT = {
    breeds: 'breeds',
    cat: 'images/search'
}

function fetchBreeds(){
   return fetch(`${BASE_URL}${END_POINT.breeds}`,{headers: {
        'x-api-key': API_KEY
    }
    }).then(response => {
        if(!response.ok){
            throw new Error()
        }
        return response.json();
    })
}
function fetchCatByBreed(breedId){
   return fetch(`${BASE_URL}${END_POINT.cat}?breed_ids=${breedId}` ,{headers: {
        'x-api-key': API_KEY,
    }
    }).then(response => {
        if(!response.ok){
            throw new Error();
        }
        return response.json();
    })

}
export {fetchBreeds, fetchCatByBreed};