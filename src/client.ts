import axios from 'axios';

const serverUrl = 'http://localhost:3000';

// Realizar una solicitud GET a la ruta "/"
axios.get(`${serverUrl}/`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

// Realizar una solicitud GET a la ruta "/api"
axios.get(`${serverUrl}/api`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

// Realizar una solicitud POST a la ruta "/api/post"
axios.post(`${serverUrl}/api/post`, {
    someData: 'example data'
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

// Realizar una solicitud POST a la ruta "/form"
let formData = new FormData();
formData.append('someField', 'example data');

axios.post(`${serverUrl}/form`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
