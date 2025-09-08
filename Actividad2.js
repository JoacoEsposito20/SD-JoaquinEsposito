const axios = require('axios');

//Enfoque Secuencial
async function mostrarPublicacionesSecuencial(){
    try{
        const responseUsuarios = await axios.get("https://jsonplaceholder.typicode.com/users");
        let usuarios = responseUsuarios.data

        let cantPublicaciones = [];
        let response;
        for(let i=1; i<4; i++){
            response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${i}`);
            cantPublicaciones[i-1] = response.data.length;
        }

        console.log("--- Ejecución Secuencial ---");
        for(let i=0; i<3; i++){
            console.log(`${usuarios[i].name} tiene ${cantPublicaciones[i]} publicaciones`);
        }        

    }catch(error){
        console.error("Error al obtener los usuarios", error.message);
    }
}

mostrarPublicacionesSecuencial();

//Enfoque Concurrente
const responseUsuarios = axios.get("https://jsonplaceholder.typicode.com/users");
const publicaciones = [1,2,3].map(id => 
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
);

Promise.all([responseUsuarios, ...publicaciones]).then((values) => {
    let usuarios = values[0].data;
    
    let cantPublicaciones = [];
    for(let i=0; i<3;i++){
        cantPublicaciones[i] = values[i+1].data.length;
    }

    console.log("--- Ejecución Concurrente ---");
    for(let i=0; i<3; i++){
        console.log(`${usuarios[i].name} tiene ${cantPublicaciones[i]} publicaciones`);
    }   
});