const codigo = document.getElementById("codigo");
const tablaDataUsuarios = document.getElementById("datos_usuario");
const tablaDataVehiculos = document.getElementById("datos_vehiculo");
/* convirtiendo los datos del local storage en un array */
let dataTodosUsers = localStorage.length+1;
const ingresoCodigo = ()=>{
    let val;
    let arr =[];
    for(let index = 1; index < dataTodosUsers;index++) {
       val = localStorage.getItem("KEY_"+index);
       arr.push(val)
    }   
   recibiendoDatos(arr);
}
codigo.addEventListener("change", ingresoCodigo);
/* recibiendo el array y filtrando la info para buscar el codigo de barras */
let recibiendoDatos =(arr)=>{
    let dataCode = [];
    for (const key in arr) {
        let ultimoArr = arr[key].split(",");
        dataCode.push(ultimoArr);
    }
    mostrandoInfo(dataCode);
}
/* fecha */
const fecha = ()=>{
    const fecha = new Date();
    const day = fecha.getDate();
    const month = fecha.getMonth()+1;
    const year = fecha.getFullYear();
    return `${day}/${month}/${year}`;
}
/* hora */
const hora =()=>{
    let _hora;
    const $hora = new Date();
    const hora = $hora.getHours();
    const minutos = $hora.getMinutes();
    if(hora > 11)_hora = " p.m.";
    else _hora = " a.m.";
    
    return `${hora}:${minutos}${_hora}`;
}

/* mostrando la info recibida por los datos filtrados y validando*/
let arr = [];
const mostrandoInfo = (dataCode)=>{
    let res = dataCode.filter(i => i.includes(codigo.value));
    if(res[0] != undefined){
        if(res[0][3] == codigo.value){
            if(res[0][1] != "Moto" && res[0][1] != "Vehiculo"){
                infoDataUsers(res);  
            }else{
                infoDataVehiculos(res);
            }
            arr.push(codigo.value);
        }
    }else{
        alert("no esta registrado/a");
        arr.splice(codigo.value);
    } 
    codigo.value= "";
}
/* asignando cada dato a la tabla y si no se repite el valor re incerta en el dom y llevando la data al sessionstorage*/
let registroDeTabla = sessionStorage.length;
const infoDataUsers = (res)=>{
      if(arr.includes(codigo.value)){
        tablaDataUsuarios.innerHTML += ""; 
      }else{
        let registro = [fecha(),hora(),res[0][0],res[0][1]+" "+res[0][2],res[0][3]]
        sessionStorage.setItem("TABLA_"+registroDeTabla++, registro);
        let arr = [];
        for (let i = 0; i < registroDeTabla; i++) {
            arr.push(sessionStorage.getItem("TABLA_"+i))
        }
        let valor = arr;
        console.log(valor)
        users = `
        <tr>
        <td>${valor[arr.length-1].split(",")[0]}</td>
        <td>${valor[arr.length-1].split(",")[1]}</td>
        <td>${valor[arr.length-1].split(",")[2]}</td>
        <td>${valor[arr.length-1].split(",")[3]}</td>
        <td>${valor[arr.length-1].split(",")[4]}</td>
        </tr>`;
        tablaDataUsuarios.innerHTML += users; 
    }
}
const infoDataVehiculos = (res,vehiculos)=>{
    if(arr.includes(codigo.value)){
        tablaDataVehiculos.innerHTML += "";    
    }else{
        vehiculos = `
        <tr>         
        <td>${res[0][0]}</td>
        <td>${res[0][1]}</td>
        <td>${res[0][2]}</td>
        <td>${res[0][3]}</td>
        </tr>`;
        tablaDataVehiculos.innerHTML += vehiculos;   
    }
}
