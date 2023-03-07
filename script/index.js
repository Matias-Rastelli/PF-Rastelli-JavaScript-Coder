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
    let telOtraConsulta = prompt(`Ingresá tu número de teléfono:`)

    alert(`Muchas gracias ${nombre}.
    Nos comunicaremos en breve contigo al siguiente número: ${telOtraConsulta}.
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
                alert("Gracias por visitar Galatea-Skin")
            }
            break;

        default:
            alert("Ingrese un número correcto")
            agregarTratamiento()
            break;
    }
}

//MAIN//
const nombre = prompt(`Bienvenido a Galatea-Skin, vamos a guiarte en tu proceso de reserva y pago de turno.
        -¿Cómo es tu nombre?`).toUpperCase()

if (nombre != "") {
    agregarTratamiento()
} else {
    alert("Gracias por visitar Galatea-Skin")
}

if (cantidadTratamientos != 0) {
    alert(`${nombre}, has elegido los siguientes tratamientos:

${masajes}
Cantidad de tratamientos: ${cantidadTratamientos}
El total es: $${cuentaTotal}`)
    reservaTurno(cantidadTratamientos)
}

function reservaTurno (cantidad) {
    let dia = 0
    let mes = 0
    let mensajeTurnos = ""
    for (let i = 1; i <= cantidad; i++) {
        dia = prompt (`Ingresa el DIA para el tratamiento N°${[i]}: [1-31]`)
        mes = prompt (`Ingresa el MES para el tratamiento N°${[i]}: [1-12]`)
        mensajeTurnos = mensajeTurnos + `El tratamiento N° ${i}  sera el día ${dia} del ${mes} \n`
    }
    alert(mensajeTurnos)
}

