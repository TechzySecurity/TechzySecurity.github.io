const header=document.querySelector("#header");
const contenedor=document.querySelector(".productos");
const body= document.querySelector("body");
window.addEventListener("scroll", function(){
    if(contenedor.getBoundingClientRect().top<10){
        header.classList.add("scroll") 
}else{  
        header.classList.remove("scroll")
    }
 });

let contactos = document.querySelector(".contactos");

contactos.style.transition = "opacity 0.5s ease";

window.addEventListener("scroll", function() {
    if (contactos.getBoundingClientRect().top < 80) {
        contactos.style.opacity = "0";
        setTimeout(() => contactos.style.visibility = "hidden", 800);
    } else {
        contactos.style.visibility = "visible";
        contactos.style.opacity = "1";  
    }
});
 

// button cerrar
document.getElementById("cerrar").addEventListener("click", carritoCierre);
function carritoCierre(){
    document.getElementById("carrito").style.display="none";
    document.getElementById("contactos").style.display="block";
    document.getElementById("cerrar").style.display="none";
}

document.getElementById("bolsa").addEventListener("click", carritoAbre);
function carritoAbre(){
    document.getElementById("carrito").style.display="block";
    document.getElementById("contactos").style.display="none";
    document.getElementById("cerrar").style.display="block";
}


 //Evento boton caracteristicas y ocultar
let botonesMostrar = document.querySelectorAll(".btn-caract");
let botonesOcultar = document.querySelectorAll(".ocultar");
let contenidos = document.querySelectorAll(".caract");

// Agregar evento a CADA botón de mostrar
botonesMostrar.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        contenidos[index].style.display = "block";
        botonesOcultar[index].style.display = "block";
        btn.style.display = "none"; // Ocultar botón de mostrar
    });
});

// Agregar evento a CADA botón de ocultar
botonesOcultar.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        contenidos[index].style.display = "none";
        botonesMostrar[index].style.display = "block";
        btn.style.display = "none"; // Ocultar botón de ocultar
    });
});




let carrito = [];
let cuerpo = document.querySelector(".bolsa table tbody");
let precio = 0;
let botones= document.querySelectorAll("#añadir");
let cuenta = document.querySelector(".bolsa .cuenta");
let total = document.getElementById("precio");
function anadir(){
    let name = this.parentNode.querySelector("h3").textContent;
    let price = this.parentNode.querySelector("p").textContent;
    let url= this.parentNode.querySelector(".imagen img").getAttribute("src");

    carrito.push({name: name, price: price, url: url});

    localStorage.setItem("articulos", JSON.stringify(carrito));
    cuenta.textContent=carrito.length;
    let newprice = parseFloat(price.slice(1));
    precio += newprice;
    total.textContent=precio.toFixed(2);

    localStorage.setItem("precio", precio.toFixed(2));

    actualizar();


}



// function actualizar(){

//     cuerpo.innerHTML="";
//     carrito.forEach(function(item, index){
//         let fila=document.createElement("tr");
//         let imagen = document.createElement("img");
//         imagen.src = item.url;

//         fila.appendChild(document.createElement("td").appendChild(imagen));

//         fila.innerHTML  += ` 
//         <td>${item.name}</td>
//         <td>${item.price}</td>
//         <td><a href="#" Onclick="eliminar(${index});">X</a></td>
//         `;

//         cuerpo.appendChild(fila);



//     })

// }
// function eliminar(index){

//     let position=carrito[index];
//     console.log(position)
//     carrito.splice(position, 1);
//     let delprecio= parseFloat(position.price.slice(1));
//     precio -= delprecio;
//     total.textContent=precio.toFixed(2);
//     cuenta.textContent=carrito.length;
//     localStorage.setItem("articulos", JSON.stringify(carrito));
//     localStorage.setItem("precio", precio.toFixed(2));
//     actualizar();

// }
function actualizar() {
    cuerpo.innerHTML = "";
    
    carrito.forEach(function (item, index) {
        let fila = document.createElement("tr");
        let imagen = document.createElement("img");
        imagen.src = item.url;

        fila.appendChild(document.createElement("td").appendChild(imagen));

        fila.innerHTML += ` 
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
            <button class="btn-eliminar" data-index="${index}" style="background: none; border: none; cursor: pointer;">
                <i class="bi bi-trash" style="color: red; font-size: 1.2rem;"></i>
            </button>
        </td>
        `;

        cuerpo.appendChild(fila);
    });

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".btn-eliminar").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            eliminar(index);
        });
    });
}
function eliminar(index) {
    if (index >= 0 && index < carrito.length) {
        let position = carrito[index]; // Obtener el elemento a eliminar
        console.log("Eliminando:", position);

        // Eliminar el elemento correcto
        carrito.splice(index, 1);

        // Actualizar precio total
        if (position) {
            let delprecio = parseFloat(position.price.slice(1));
            precio -= delprecio;
            total.textContent = precio.toFixed(2);
        }

        // Actualizar el contador del carrito
        cuenta.textContent = carrito.length;

        // Guardar los cambios en localStorage
        localStorage.setItem("articulos", JSON.stringify(carrito));
        localStorage.setItem("precio", precio.toFixed(2));

        // Volver a renderizar el carrito
        actualizar();
    }
}

window.addEventListener("load", cargar);
function cargar(){
    let itemlocal=localStorage.getItem("articulos");
    let preciolocal=localStorage.getItem("precio");
    if(itemlocal){
        carrito= JSON.parse(itemlocal);
        precio=parseFloat(preciolocal);
        total.textContent=precio.toFixed(2);
        actualizar();
    }
}

function vaciar2(){
    cuerpo.innerHTML="";
    cuenta.innerHTML="0";
    precio=0;
    carrito=[];
    localStorage.removeItem("articulos");
    localStorage.removeItem("precio");
    total.innerHTML="0";
}
document.getElementById("comprar").addEventListener("click", function() {
    setTimeout(() => { // Espera 500ms para asegurar que la tabla tenga datos
        let datosTabla = comprarPro(); // Guardar los datos de la tabla
        let total = obtenerTotal(); // Obtener el total

        console.log("Datos obtenidos de la tabla:", datosTabla);
        console.log("Total obtenido:", total);

        if (datosTabla.trim() === "" && total.trim() === "") {
            alert("No hay productos en el carrito.");
            return;
        }

        enviarWhatsApp(datosTabla, total); // Pasar los datos y el total a WhatsApp
    }, 500);
});

function comprarPro() {
    let tabla = document.getElementById("alex"); // ID de la tabla
    if (!tabla) {
        console.error("No se encontró la tabla con ID 'miTabla'");
        return "";
    }

    let filas = tabla.getElementsByTagName("tr");
    let datos = [];

    for (let i = 0; i < filas.length; i++) {
        let celdas = filas[i].getElementsByTagName("td");
        let filaDatos = [];

        for (let j = 0; j < celdas.length; j++) {
            filaDatos.push(celdas[j].innerText.trim());
        }

        if (filaDatos.length > 0) {
            datos.push(filaDatos.join(" | ")); // Separar cada fila con "|"
        }
    }

    return datos.join("\n"); // Unir todas las filas con un salto de línea
}

function obtenerTotal() {
    let totalElemento = document.getElementById("precio"); // Asegúrate de que el ID coincida con el de tu HTML
    if (totalElemento) {
        return totalElemento.innerText.trim(); // Obtener el valor del total
    }
    return "";
}

function enviarWhatsApp(datos, total) {
    let numero = "5930959990406"; // Número de destino sin "+" ni espacios
    let mensaje = `Hola Techzy 😊🫶 me interesa comprar estos productos, me ayudas con mas información 🥰 :\n\n${datos}\n\n💸💸💸 Total: ${total}`;
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    console.log("Mensaje enviado a WhatsApp:", mensaje); // Verificar el mensaje final

    window.open(url, "_blank"); // Abre en una nueva pestaña
}

botones.forEach(function(btn){
    btn.addEventListener("click" , anadir);
});