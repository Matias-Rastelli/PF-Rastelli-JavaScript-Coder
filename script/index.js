// simulador de pago y entrega de turnos de estetica //
let cuentaTotal = 0
let masajes = ""
let cantidadTratamientos = 0
let msjDescontracturante = "Masajes descontracturantes"
let precioDescontracturante = 2500
let msjRelajante = "Masajes relajantes"
let precioRelajante = 2000
let vacum = "Vacum"
let precioVacum = 1500
let limpiezaFacial = "Limpieza facial"
let precioLimpiezaFacial = 1000
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
    masajes = masajes + `- ${tipoMasaje} \n`
    cantidadTratamientos++
    cuentaTotal += precioMasaje
    alert(`${tipoMasaje}:
    - Costo: $${precioMasaje}
    
    - Cantidad de tratamientos: ${cantidadTratamientos}
    - Subtotal: ${cuentaTotal}`)
}

function otraConsulta() {
    cuentaTotal = 0
    cantidadTratamientos = 0
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
        [1] ${msjDescontracturante}
        [2] ${msjRelajante}
        [3] ${vacum}
        [4] ${limpiezaFacial}

        [5] Otro tipo de consulta (borrará los tratamientos previos que hayas elegido)
        [6] No necesito nada más`)

    switch (tratamiento) {
        case "1":
            alertaCase(msjDescontracturante, precioDescontracturante)
            preguntaOtroTratamiento()

            break;
        case "2":
            alertaCase(msjRelajante, precioRelajante)
            preguntaOtroTratamiento()

            break;
        case "3":
            alertaCase(vacum, precioVacum)
            preguntaOtroTratamiento()

            break;
        case "4":
            alertaCase(limpiezaFacial, precioLimpiezaFacial)
            preguntaOtroTratamiento()

            break;
        case "5": otraConsulta()

            break;
        case "6":
            if (cantidadTratamientos == 0) {
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

    for (let i = 1; i <= cantidad; i++) {
        do {
            let input = prompt(`Ingrese el DIA del mes para el tratamiento ${[i]} \n [1 - 31]`)
            dia = parseInt(input);
        } while (isNaN(dia) || !(dia >= 1 && dia <= 31));

        do {
            let input = prompt(`DIA elegido: ${dia} \n Ingrese el MES para el tratamiento ${[i]}
            [1] - ENERO             [7] - JULIO
            [2] - FEBRERO          [8] - AGOSTO
            [3] - MARZO            [9] - SEPTIEMBRE
            [4] - ABRIL               [10] - OCTUBRE
            [5] - MAYO              [11] - NOVIEMBRE
            [6] - JUNIO              [12] - DICIEMBRE `)
            mes = parseInt(input);
        } while (isNaN(mes) || !(mes >= 1 && mes <= 12));

        do {
            let input = prompt(`FECHA: ${dia}/${mes} \n Ingrese la HORA para el tratamiento ${[i]} \n
            [Trabajamos de 9 a 17 horas]`)
            hora = parseInt(input);
        } while (isNaN(hora) || !(hora >= 9 && hora <= 17));

        mensajeTurnos = mensajeTurnos + `El tratamiento N° ${i} sera el día ${dia} / ${mes} a las ${hora}hs. \n`
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

if (cantidadTratamientos != 0) {
    mensajeTratamientos = `${nombre}, has elegido los siguientes tratamientos: \n${masajes} \n Cantidad de tratamientos: ${cantidadTratamientos} \n El total es: $${cuentaTotal}`
    alert(mensajeTratamientos)
    reservaTurno(cantidadTratamientos)
}

if (cantidadTratamientos != 0){
alert(`${mensajeTratamientos} \n \n ${mensajeTurnos} \n \n Agradecemos tu consulta y te esperamos para que disfrutes de nuestro trabajo.`)
}