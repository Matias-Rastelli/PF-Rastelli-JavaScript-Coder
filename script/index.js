// simulador de pago y entrega de turnos de estetica //

const carrito = {cuentaTotal: 0, masajes:[] }

const msjDescontracturante = {nombre: "Masajes descontracturantes", precio: 2500}
const msjRelajante = {nombre: "Masajes relajantes", precio: 2000}
const vacum = {nombre: "Vacum", precio: 1500}
const limpiezaFacial = {nombre: "Limpieza facial", precio: 1000}

let mensajeTratamientos = ""
let mensajeTurnos = ""

function preguntaOtroTratamiento() {
    let n = prompt(`¿Te gustaría agregar otro tratamiento?
    [1] SI
    [2] NO`)
    while (n !== "1" && n !== "2") {
        n = prompt(`La opción elegida no es correcta. ¿Te gustaría agregar otro tratamiento?
        [1] SI
        [2] NO`)
    }
    if (n == "1") {
        agregarTratamiento();
    } else if (n == "2") {
        alert(`Muchas gracias, a continuación tus elecciones...`)
    } else {
        alert(`La opción elegida no es correcta`)
    }
}

function alertaCase (tipoMasaje, precioMasaje) {

    carrito.masajes.push(tipoMasaje)
    carrito.cuentaTotal += precioMasaje

    alert(`${tipoMasaje}:
    - Costo: $${precioMasaje}
    
    - Cantidad de tratamientos: ${carrito.masajes.length}
    - Subtotal: $${carrito.cuentaTotal}`)
}

function otraConsulta() {
    carrito.cuentaTotal = 0
    carrito.masajes = []
    let consulta = prompt(`Dejanos aquí tu consulta:`)
    let contactoOtraConsulta = prompt(`Ingresá tu email o telefono:`)
    
    alert(`Muchas gracias ${nombre}.
    Nos comunicaremos en breve contigo a: ${contactoOtraConsulta}.
    Por la consulta:
    ${consulta}`)
}

function agregarTratamiento() {
    let tratamiento = prompt(`¿Que tratamiento te gustaría realizar? 
    (ingrese el número correspondiente)
        [1] ${msjDescontracturante.nombre}
        [2] ${msjRelajante.nombre}
        [3] ${vacum.nombre}
        [4] ${limpiezaFacial.nombre}

        [5] Otro tipo de consulta (borrará los tratamientos previos que hayas elegido)
        [6] No necesito nada más`)

    switch (tratamiento) {
        case "1":
            alertaCase(msjDescontracturante.nombre, msjDescontracturante.precio)
            preguntaOtroTratamiento()

            break;
        case "2":
            alertaCase(msjRelajante.nombre, msjRelajante.precio)
            preguntaOtroTratamiento()

            break;
        case "3":
            alertaCase(vacum.nombre, vacum.precio)
            preguntaOtroTratamiento()

            break;
        case "4":
            alertaCase(limpiezaFacial.nombre, limpiezaFacial.precio)
            preguntaOtroTratamiento()

            break;
        case "5": otraConsulta()

            break;
        case "6":
            if (carrito.masajes.length == 0) {
                alert(`Gracias ${nombre} por visitar Galatea-Skin, esperamos para la próxima puedas elegirnos.`)
            }
            break;

        default:
            alert("Ingrese un número correcto")
            agregarTratamiento()
            break;
        }
}

function reservaTurno(cantidad) {

    let dia = 0
    let mes = 0
    let hora = 0

    for (let i = 0; i < cantidad; i++) {
        do {        

            let input = prompt(`Ingrese el DIA del mes para el tratamiento: \n ${[i+1]} - ${carrito.masajes[i]} \n [1 - 31]`)
            dia = parseInt(input);
            
        } while (isNaN(dia) || !(dia >= 1 && dia <= 31));

        do {
            let input = prompt(`DIA elegido: ${dia} \n Ingrese el MES para el tratamiento: \n ${[i+1]} - ${carrito.masajes[i]}
            [1] - ENERO             [7] - JULIO
            [2] - FEBRERO          [8] - AGOSTO
            [3] - MARZO            [9] - SEPTIEMBRE
            [4] - ABRIL               [10] - OCTUBRE
            [5] - MAYO              [11] - NOVIEMBRE
            [6] - JUNIO              [12] - DICIEMBRE `)
            mes = parseInt(input);
        } while (isNaN(mes) || !(mes >= 1 && mes <= 12));

        do {
            let input = prompt(`FECHA: ${dia}/${mes} \n Ingrese la HORA para el tratamiento: \n ${[i+1]} - ${carrito.masajes[i]} \n
            [Trabajamos de 9 a 17 horas]`)
            hora = parseInt(input);
        } while (isNaN(hora) || !(hora >= 9 && hora <= 17));

        mensajeTurnos += `El tratamiento  ${[i+1]} - ${carrito.masajes[i]} sera el día ${dia} / ${mes} a las ${hora}hs. \n`
    }
    alert(mensajeTurnos)
}

//MAIN//
const nombre = prompt(`Bienvenido a Galatea-Skin, vamos a guiarte en tu proceso de reserva de turno.
        -¿Cómo es tu nombre?`).toUpperCase()

if (nombre != "") {
    agregarTratamiento()
} else {
    alert("Gracias por visitar Galatea-Skin")
}

if (carrito.masajes.length != 0) {

    masajesConcat = carrito.masajes.join("\n")
    mensajeTratamientos = `${nombre}, has elegido los siguientes tratamientos:\n\n${masajesConcat} \n\n Cantidad de tratamientos: ${carrito.masajes.length} \n El total es: $${carrito.cuentaTotal}`
    
    alert(mensajeTratamientos)
    reservaTurno(carrito.masajes.length)
}

if (carrito.masajes.length != 0){
alert(`${mensajeTratamientos} \n \n ${mensajeTurnos} \n \n Agradecemos tu consulta y te esperamos para que disfrutes de nuestro trabajo.`)
}



