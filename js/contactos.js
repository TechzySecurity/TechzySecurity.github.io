const formulario= document.getElementById("formulario");
const inputs=document.querySelectorAll("#formulario input");


const expresiones = {
    nombres: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]{4,50}$/, // Se permite mayúsculas, minúsculas y espacios.
    telefono: /^\d{7,14}$/, // Se quitó el espacio extra en {7,14}
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Se quitó el espacio antes del punto.
    ciudad: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]{4,20}$/, // Se corrigió el nombre y se permiten espacios.
    comentario: /^[\s\S]{1,500}$/ // Permite cualquier carácter, incluyendo saltos de línea, hasta 500 caracteres.
};

const validarFormulario= (e) => {
    switch(e.target.name){
        case "nombres": 
            if(expresiones.nombres.test(e.target.value)){
                document.querySelector("#grupo-nombre .imput-error").classList.remove("imput-error-action")
            }else{
                document.querySelector("#grupo-nombre .imput-error").classList.add("imput-error-action")
            }
        break;
        case "celular":
            if(expresiones.telefono.test(e.target.value)){
                document.querySelector("#grupo-celular .imput-error").classList.remove("imput-error-action")
            }else{
                document.querySelector("#grupo-celular .imput-error").classList.add("imput-error-action")
            }
        break;
        case "email":
            if(expresiones.correo.test(e.target.value)){
                document.querySelector("#grupo-email .imput-error").classList.remove("imput-error-action")
            }else{
                document.querySelector("#grupo-email .imput-error").classList.add("imput-error-action")
            }
        break;
        case "ciudad":
            if(expresiones.ciudad.test(e.target.value)){
                document.querySelector("#grupo-ciudad .imput-error").classList.remove("imput-error-action")
            }else{
                document.querySelector("#grupo-ciudad .imput-error").classList.add("imput-error-action")
            }
        break;
        case "comentario":
            if(expresiones.comentario.test(e.target.value)){
                document.querySelector("#grupo-comentario .imput-error").classList.remove("imput-error-action")
            }else{
                document.querySelector("#grupo-comentario .imput-error").classList.add("imput-error-action")
            }
        break;
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let name=document.getElementById("nombres").value;
    let celular=document.getElementById("celular").value;
    let email=document.getElementById("email").value;
    let cuidad=document.getElementById("cuidad").value;
    let comentario=document.getElementById("comentario").value;
    
   
    if(name==""||celular==""||email==""||cuidad==""||comentario==""){
        document.getElementById("alertGeneral").style.display="block"
            document.getElementById("alertEnviar").style.display="none"
        
    }else{
        document.getElementById("alertGeneral").style.display="none"
        enviarInfo();
        document.getElementById("alertEnviar").style.display="block"
    }

})

//activar los eventos al presionar una tecla
inputs.forEach((input)=>{
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
})

function enviarInfo(){
        // Seleccionamos todos los inputs dentro del formulario
        let inputs = document.querySelectorAll("input, textarea");
        // Recorremos los inputs y les asignamos un valor vacío
        inputs.forEach(input => {
            input.value = "";
        });
}
const checkboxTerminos = document.getElementById("terminos");
const enviarBtn = document.getElementById("enviar");

// Función para habilitar/deshabilitar el botón
function verificarTerminos() {
    enviarBtn.disabled = !checkboxTerminos.checked; // Si está marcado, habilita el botón
}

// Escuchar cambios en el checkbox
checkboxTerminos.addEventListener("change", verificarTerminos);

// Deshabilitar el botón por defecto al cargar la página
verificarTerminos();









