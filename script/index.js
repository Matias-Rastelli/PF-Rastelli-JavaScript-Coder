// simulador de pago y entrega de turnos de estetica //
let cuentaTotal = 0
let masajes = ""
let cantidadTratamientos = 0

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

function otraconsulta() {
    cuentaTotal = 0
    cantidadTratamientos = 0
    let consulta = prompt(`Dejanos aquí tu consulta:`)
    let telOtraConsulta = prompt(`Ingresá tu número de teléfono:`)

    alert(`Muchas gracias ${nombre}.
    Nos comunicaremos en breve contigo al siguiente número: ${telOtraConsulta}.
    Por la consulta:
    ${consulta}`)
}

const nombre = prompt(`Bienvenido a Galatea-Skin, vamos a guiarte en tu proceso de reserva y pago de turno.
        -¿Cómo es tu nombre?`).toUpperCase()

if (nombre != "") {
    agregarTratamiento()
} else {
    alert("Gracias por visitar Galatea-Skin")
}

function agregarTratamiento() {
    let tratamiento = prompt(`¿Que tratamiento te gustaría realizar? 
    (ingrese el número correspondiente)
        [1] Masajes descontracturantes
        [2] Masajes relajantes
        [3] Vacum
        [4] Limpieza facial
        [5] Otro tipo de consulta (borrará los tratamientos previos que hayas elegido)
        [6] No necesito nada más`)

    switch (tratamiento) {
        case "1":
            masajes = masajes + "- Masajes descontracturantes \n"
            cantidadTratamientos++
            cuentaTotal += 2500
            alert(`Masajes descontracturantes:
                - Costo: $2500
    
                - Total tratamientos: ${cantidadTratamientos}
                - Subtotal: ${cuentaTotal}`)

                
            preguntaOtroTratamiento()

            break;
        case "2":
            masajes = masajes + "- Masajes relajantes \n"
            cantidadTratamientos++
            cuentaTotal += 2000
            alert(`Masajes relajantes:
                - Costo: $2000
    
                - Total tratamientos: ${cantidadTratamientos}
                - Subtotal: ${cuentaTotal}`)

            preguntaOtroTratamiento()

            break;
        case "3":
            masajes = masajes + "- Vacum \n"
            cantidadTratamientos++
            cuentaTotal += 2500
            alert(`Vacum:
                - Costo: $2500
    
                - Total tratamientos: ${cantidadTratamientos}
                - Subtotal: ${cuentaTotal}`)

            preguntaOtroTratamiento()

            break;
        case "4":
            masajes = masajes + "- Limpieza facial \n"
            cantidadTratamientos++
            cuentaTotal += 2500
            alert(`Limpieza facial:
                - Costo: $2500
    
                - Total tratamientos: ${cantidadTratamientos}
                - Subtotal: ${cuentaTotal}`)

            preguntaOtroTratamiento()

            break;
        case "5": otraconsulta()

            break;
        case "6":
            if (cantidadTratamientos == 0) {
                alert("Gracias por visitar Galatea-Skin")
            }
            break;

        default: console.log("poné bien el numero pajín")
            alert("Ingrese un número correcto")
            agregarTratamiento()
            break;
    }
}


if (cantidadTratamientos != 0) {
    alert(`${nombre}, has elegido los siguientes tratamientos:

${masajes}
Cantidad de tratamientos: ${cantidadTratamientos}
El total es: $${cuentaTotal}`)
    reservaTurno()
}