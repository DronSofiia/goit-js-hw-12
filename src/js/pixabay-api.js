import axios from "axios";

const API_KEY = "53521476-959e2edb95accc90458c283c4";
const BASE_URL = "https://pixabay.com/api/";

export function getImagesByQuery(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    };

    return axios(BASE_URL, { params })
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        })
    
}