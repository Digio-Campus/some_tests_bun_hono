import axios from 'axios';

//NO FUNCIONA

const serverUrl = 'http://localhost:3000';

// Realizar una solicitud GET a la ruta "/"
axios.get(`${serverUrl}/`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("ERROR",error);
  });

// Realizar una solicitud GET a la ruta "/static/hello.txt"
axios.get(`${serverUrl}/static/hello.txt`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
      console.error("ERROR",error);
  });

// Realizar una solicitud GET a una ruta no definida para obtener el archivo de fallback
axios.get(`${serverUrl}/undefined-route`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
      console.error("ERROR",error);
  });
