// simulador de pago y entrega de turnos de estetica //
const carrito = { cuentaTotal: 0, masajes: [] }
const tratamientos = []
let mensajeTratamientos = ""
let mensajeTurnos = ""

class Tratamientos {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.id = tratamientos.length + 1
        this.reserva = {
            dia: Number,
            mes: Number,
            hora: Number
        }
    }

    pushearTratamiento() {
        tratamientos.push(this)
    }

    cambiarPrecio(nuevoPrecio) {
        this.precio = parseFloat(nuevoPrecio)
    }
    cambiarNombre(nuevoNombre) {
        this.nombre = nuevoNombre
    }
}

const tratamientosIniciales = [
    { nombre: "Masajes descontracturantes", precio: 2500 },
    { nombre: "Masajes relajantes", precio: 2000 },
    { nombre: "Vacum", precio: 1500 },
    { nombre: "Limpieza facial", precio: 1000 },
]

function crearTratamientosDesdeArray(arrayTratamientos) {
    arrayTratamientos.forEach((tratamiento) => {
        const nuevoTratamiento = new Tratamientos(tratamiento.nombre, tratamiento.precio);
        tratamientos.push(nuevoTratamiento);
    });
}

function loginAdministrador() {
    let pass = ""
    let i = 0
    do {
        pass = prompt(`Bienvenido Administrador ${nombre} ingresa tu contraseña:`)
        i++
        console.log(i)
    } while (pass !== "admin" && i <= 2);

    if (i >= 2) {
        alert(`Lo siento ${nombre} la contraseña es incorrecta y excediste los intentos.`)
        agregarTratamiento()
    } else { opcionesAdministrador() }
}


function opcionesAdministrador() {

    function alertaAdministrador(id, accion) {
        alert(`El tratamiento fue ${accion}, sus nuevos valores son: \n
        ID: ${tratamientos[id - 1].id}
        Nombre: ${tratamientos[id - 1].nombre}
        Precio: ${tratamientos[id - 1].precio}`)
        opcionesAdministrador()
    }

    const tratamientosAdministrar = tratamientos.map(tratamiento => `[${tratamiento.id}] - ${tratamiento.nombre}`)
    const tratamientosAdministrarConcat = tratamientosAdministrar.join("\n")

    let imput = prompt(`Bienvenido ${nombre}, ¿Que te gustaria hacer? 
    (ingrese el número correspondiente)
        [1] Cambiar precio a un tratamiento
        [2] Cambiar nombre a un tratamiento
        [3] Crear nuevo tratamiento

        [4] Volver atras`)

    if (imput == 1) {
        let id = parseInt(prompt(`¿A que tratamiento le cambiamos el PRECIO? 
        (ingrese el número correspondiente)\n
${tratamientosAdministrarConcat} `))

        if (id < 1 || id > tratamientos.length || isNaN(id)) {
            alert("El tratamiento no existe o el valor ingresado es incorrecto")
            opcionesAdministrador()
        } else {
            let imput = prompt(`Ingrese el nuevo precio para el tratamiento \n
        ${tratamientos[id - 1].id} - ${tratamientos[id - 1].nombre} \n
        Precio actual: ${tratamientos[id - 1].precio} `)
            tratamientos[id - 1].cambiarPrecio(imput)
            alertaAdministrador(id, "modificado")
        }

    } else if (imput == 2) {
        let id = prompt(`¿A que tratamiento le cambiamos el NOMBRE? 
                        (ingrese el número correspondiente)
${tratamientosAdministrarConcat}`)

        if (id < 1 || id > tratamientos.length || isNaN(id)) {
            alert("El tratamiento no existe o el valor ingresado es incorrecto")
            opcionesAdministrador()
        } else {
            let imput = prompt(`Ingrese el nuevo NOMBRE para el tratamiento \n
        ${tratamientos[id - 1].id} - ${tratamientos[id - 1].nombre} - ${tratamientos[id - 1].precio} `)
            tratamientos[id - 1].cambiarNombre(imput)
            alertaAdministrador(id, "modificado")
        }

    } else if (imput == 3) {
        crearNuevoTratamiento(prompt("Ingrese el nombre del nuevo tratamiento: [ej: Masajes de piernas] "), prompt("Ingrese el precio del nuevo tratamiento [ej: 1000] "))
        alertaAdministrador(tratamientos.length, "agregado")
    } else if (imput == 4) {
        agregarTratamiento()
    } else {
        alert(`${nombre} sos un pelotudo, pone una opcion correcta`)
        opcionesAdministrador()
    }
}

function crearNuevoTratamiento(nombre, precio) {
    const newTratamiento = new Tratamientos(nombre, precio)
    newTratamiento.pushearTratamiento()
}

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

function alertaCase(tratamiento) {

    carrito.masajes.push(tratamiento)
    carrito.cuentaTotal += tratamiento.precio

    alert(`${tratamiento.nombre}:
    - Costo: $${tratamiento.precio}
    
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
        [${tratamientos[0].id}] ${tratamientos[0].nombre}
        [${tratamientos[1].id}] ${tratamientos[1].nombre}
        [${tratamientos[2].id}] ${tratamientos[2].nombre}
        [${tratamientos[3].id}] ${tratamientos[3].nombre}

        [5] Otro tipo de consulta (borrará los tratamientos previos que hayas elegido)
        [6] No necesito nada más
        [7] Funciones de administrador`)

    switch (tratamiento) {
        case "1":
            alertaCase(tratamientos[0])
            preguntaOtroTratamiento()

            break;
        case "2":
            alertaCase(tratamientos[1])
            preguntaOtroTratamiento()

            break;
        case "3":
            alertaCase(tratamientos[2])
            preguntaOtroTratamiento()

            break;
        case "4":
            alertaCase(tratamientos[3])
            preguntaOtroTratamiento()

            break;
        case "5": otraConsulta()

            break;
        case "6":
            if (carrito.masajes.length == 0) {
                alert(`Gracias ${nombre} por visitar Galatea-Skin, esperamos para la próxima puedas elegirnos.`)
            }
            break;

        case "7":
            loginAdministrador()
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

            let input = prompt(`Ingrese el DIA del mes para el tratamiento: \n ${[i + 1]} - ${carrito.masajes[i].nombre} \n [1 - 31]`)
            dia = parseInt(input);
            carrito.masajes[i].reserva.dia = dia

        } while (isNaN(dia) || !(dia >= 1 && dia <= 31));

        do {
            let input = prompt(`DIA elegido: ${carrito.masajes[i].dia} \n Ingrese el MES para el tratamiento: \n ${[i + 1]} - ${carrito.masajes[i].nombre}
            [1] - ENERO             [7] - JULIO
            [2] - FEBRERO          [8] - AGOSTO
            [3] - MARZO            [9] - SEPTIEMBRE
            [4] - ABRIL               [10] - OCTUBRE
            [5] - MAYO              [11] - NOVIEMBRE
            [6] - JUNIO              [12] - DICIEMBRE `)
            mes = parseInt(input);
            carrito.masajes[i].reserva.mes = mes
        } while (isNaN(mes) || !(mes >= 1 && mes <= 12));

        do {
            let input = prompt(`FECHA: ${carrito.masajes[i].dia}/${carrito.masajes[i].mes} \n Ingrese la HORA para el tratamiento: \n ${[i + 1]} - ${carrito.masajes[i].nombre} \n
            [Trabajamos de 9 a 17 horas]`)
            hora = parseInt(input);
            carrito.masajes[i].reserva.hora = hora
        } while (isNaN(hora) || !(hora >= 9 && hora <= 17));

        mensajeTurnos += `El tratamiento  ${[i + 1]} - ${carrito.masajes[i].nombre} sera el día ${dia} / ${mes} a las ${hora}hs. \n`
    }
    alert(mensajeTurnos)
}

//MAIN//

const nombre = prompt(`Bienvenido a Galatea-Skin, vamos a guiarte en tu proceso de reserva de turno.
        -¿Cómo es tu nombre?`).toUpperCase()

if (nombre != "") {
    crearTratamientosDesdeArray(tratamientosIniciales)
    agregarTratamiento()
} else {
    alert("Gracias por visitar Galatea-Skin")
}

if (carrito.masajes.length != 0) {

    const nombresTratamientos = carrito.masajes.map(tratamiento => tratamiento.nombre)
    nombresConcat = nombresTratamientos.join("\n")
    mensajeTratamientos = `${nombre}, has elegido los siguientes tratamientos:\n\n${nombresConcat} \n\n Cantidad de tratamientos: ${carrito.masajes.length} \n El total es: $${carrito.cuentaTotal}`

    alert(mensajeTratamientos)
    reservaTurno(carrito.masajes.length)
}

if (carrito.masajes.length != 0) {
    alert(`${mensajeTratamientos} \n \n ${mensajeTurnos} \n \n Agradecemos tu consulta y te esperamos para que disfrutes de nuestro trabajo.`)
}