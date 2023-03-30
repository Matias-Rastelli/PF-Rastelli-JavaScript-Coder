// simulador de pago y reserva de turnos de estetica //

const carrito = {cuentaTotal: 0, masajes: [], mensajeTratamientos:"" , mensajeTurnos:"" }
const tratamientos = []

class Tratamientos {
    constructor(nombre, precio, categoria) {
        this.nombre = nombre
        this.descripcion = ""
        this.precio = parseFloat(precio)
        this.categoria = categoria
        this.id = tratamientos.length + 1
        this.fecha = new Date()
    }

    pushearTratamiento() {
        tratamientos.push(this)
    }

    cambiarNombre(nuevoNombre) {
        this.nombre = nuevoNombre
    }
    cambiarPrecio(nuevoPrecio) {
        this.precio = parseFloat(nuevoPrecio)
    }
    cambiarCategoria(nuevaCategoria){
        this.categoria = nuevaCategoria
    }
    cambiarDescripcion(nuevaDescripcion){
        this.descripcion = nuevaDescripcion
    }

    cambiarFecha(fechaIngresada){
        const nuevaFecha = fechaIngresada
        this.fecha.setFullYear(nuevaFecha.getFullYear())
        this.fecha.setMonth(nuevaFecha.getMonth())
        this.fecha.setDate(nuevaFecha.getDate())
        this.fecha.setHours(nuevaFecha.getHours())
        this.fecha.setMinutes(0)
        this.fecha.setSeconds(0)
        this.fecha.setMilliseconds(0)
    }
}

const tratamientosIniciales = [
    {
        nombre: "Tratamientos de hidratación capilar",
        precio: 3000,
        descripcion: "Tratamiento para hidratar y revitalizar el cabello seco y maltratado",
        categoria: "cabeza"
    },
    {
        nombre: "Tratamientos de nutrición capilar",
        precio: 4000,
        descripcion: "Tratamiento para nutrir y fortalecer el cabello debilitado y sin vida",
        categoria: "cabeza"
    },
    {
        nombre: "Tratamientos de queratina",
        precio: 5000,
        descripcion: "Tratamiento para alisar y reducir el frizz en el cabello",
        categoria: "cabeza"
    },
    {
        nombre: "Limpieza facial profunda",
        precio: 2000,
        descripcion: "Limpieza facial profunda para eliminar impurezas y células muertas",
        categoria: "rostro"
    },
    {
        nombre: "Tratamientos de exfoliación facial",
        precio: 2500,
        descripcion: "Tratamiento para exfoliar y suavizar la piel del rostro",
        categoria: "rostro"
    },
    {
        nombre: "Tratamientos de eliminación de puntos negros y espinillas",
        precio: 3000,
        descripcion: "Tratamiento para remover los puntos negros y espinillas del rostro",
        categoria: "rostro"
    },
    {
        nombre: "Tratamientos de lifting facial",
        precio: 4500,
        descripcion: "Tratamiento para levantar y reafirmar la piel del rostro",
        categoria: "rostro"
    },
    {
        nombre: "Tratamientos de microdermabrasión",
        precio: 3500,
        descripcion: "Tratamiento para exfoliar y mejorar la textura de la piel del rostro",
        categoria: "rostro"
    },
    {
        nombre: "Tratamientos de radiofrecuencia facial",
        precio: 4000,
        descripcion: "Tratamiento para rejuvenecer y tonificar la piel del rostro",
        categoria: "rostro"
    },
    {
        nombre: 'Masaje relajante',
        precio: 2500,
        descripcion: 'Masaje suave y relajante que ayuda a reducir el estrés y la ansiedad.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje descontracturante',
        precio: 3500,
        descripcion: 'Masaje profundo que ayuda a aliviar la tensión muscular y reducir las contracturas.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje deportivo',
        precio: 4500,
        descripcion: 'Masaje intenso que ayuda a prevenir lesiones y mejorar el rendimiento físico.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje de drenaje linfático',
        precio: 3000,
        descripcion: 'Masaje suave y lento que ayuda a mejorar la circulación linfática y reducir la retención de líquidos.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje reflexológico',
        precio: 2000,
        descripcion: 'Masaje que se enfoca en los puntos de reflexología para aliviar dolores y mejorar la salud general del cuerpo.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje con piedras calientes',
        precio: 4000,
        descripcion: 'Masaje que utiliza piedras calientes para relajar los músculos y mejorar la circulación sanguínea.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje con ventosas',
        precio: 3500,
        descripcion: 'Masaje que utiliza ventosas para mejorar la circulación sanguínea y reducir la tensión muscular.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje con aromaterapia',
        precio: 3000,
        descripcion: 'Masaje que utiliza aceites esenciales para relajar y equilibrar el cuerpo y la mente.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje con digitopresión',
        precio: 2500,
        descripcion: 'Masaje que utiliza la presión de los dedos para aliviar dolores y mejorar la circulación.',
        categoria: 'cuerpo'
    },
    {
        nombre: 'Masaje de tejido profundo',
        precio: 4500,
        descripcion: 'Masaje intenso que llega a las capas más profundas de los músculos para aliviar la tensión crónica y mejorar la postura.',
        categoria: 'cuerpo'
    },
    {
        nombre: "Pedicura básica",
        precio: 1500,
        descripcion: "Incluye corte y limado de uñas, retiro de cutículas y esmaltado.",
        categoria: "pies"
    },
    {
        nombre: "Pedicura Spa",
        precio: 2500,
        descripcion: "Incluye baño de pies, exfoliación, hidratación y masaje.",
        categoria: "pies"
    },
    {
        nombre: "Reflexología",
        precio: 2000,
        descripcion: "Terapia de masaje aplicada a los pies para estimular puntos reflejos en el cuerpo.",
        categoria: "pies"
    },
    {
        nombre: "Tratamiento de parafina",
        precio: 3000,
        descripcion: "Sumergir los pies en parafina caliente para hidratar y suavizar la piel.",
        categoria: "pies"
    },
    {
        nombre: "Tratamiento de la piel seca",
        precio: 2000,
        descripcion: "Tratamiento para hidratar y suavizar la piel seca de los pies.",
        categoria: "pies"
    },
    {
        nombre: "Masaje de pies",
        precio: 1500,
        descripcion: "Terapia de masaje aplicada a los pies para aliviar tensiones y mejorar la circulación.",
        categoria: "pies"
    },
    {
        nombre: "Tratamiento de hongos en las uñas",
        precio: 3500,
        descripcion: "Tratamiento para eliminar los hongos en las uñas de los pies.",
        categoria: "pies"
    }
]



function crearTratamientosDesdeArray(arrayTratamientos) {
    arrayTratamientos.forEach((tratamiento) => {
        const nuevoTratamiento = new Tratamientos(tratamiento.nombre, tratamiento.precio, tratamiento.categoria);
        tratamientos.push(nuevoTratamiento);
    });
}

function crearTabla() {
    
    console.log(tratamientos)
    const tabla = document.getElementById("body-tabla")
    console.log(tabla)

    const tablaFiltrada = tratamientos.filter(elemento => elemento.categoria === "pies")

    tablaFiltrada.forEach((tratamiento) => {
        const itemTabla = document.createElement("tr")
        itemTabla.innerHTML = ` 
        <td>${tratamiento.id} </td>
        <td>${tratamiento.nombre} </td>
        <td>$${tratamiento.precio} </td>
        <td>${tratamiento.categoria} </td>
        <td><button class="boton-editar">EDITAR</button></th>
        `

        tabla.appendChild(itemTabla)
    })
}

function menuPrincipal() {
    let opcionMenuPrincipal = prompt(`Bienvenido ${nombre}, ¿Cómo podemos ayudarte?
    (ingrese el número correspondiente)

        [1] Reservar tratamientos
        [2] Otro tipo de consulta (elimina reservas)
        [3] Funciones de administrador

        [4] Salir`)

    switch (opcionMenuPrincipal) {
        case "1":
            reservaTratamientos()

            break;
        case "2":
            otraConsulta()

            break;
        case "3":
            loginAdministrador()

            break;
        case "4":
            if (carrito.masajes.length == 0) {
                alert(`Gracias ${nombre} por visitar Galatea-Skin, esperamos para la próxima puedas elegirnos.`)
            }
            break;
        default:
            menuPrincipal()
            break;
    }
}

function loginAdministrador() {
    let pass = ""
    let i = 0
    do {
        pass = prompt(`Bienvenido Administrador ${nombre} ingresá tu contraseña: (pass: admin)`)
        i++
        console.log(i)
    } while (pass !== "admin" && i <= 2);

    if (i >= 2) {
        alert(`Lo siento ${nombre} la contraseña es incorrecta y excediste los intentos.`)
        menuPrincipal()
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
        [4] Eliminar un tratamiento

        [5] Volver atras`)

    if (imput == 1) {
        let id = parseInt(prompt(`¿A que tratamiento le cambiamos el PRECIO? 
        (ingrese el número correspondiente)\n${tratamientosAdministrarConcat} `))

        if (id < 1 || id > tratamientos.length || isNaN(id)) {
            alert("El tratamiento no existe o el valor ingresado es incorrecto")
            opcionesAdministrador()
        } else {
            let imput = prompt(`Ingrese el nuevo precio para el tratamiento \n${tratamientos[id - 1].id} - ${tratamientos[id - 1].nombre}\n
        Precio actual: ${tratamientos[id - 1].precio} `)
            tratamientos[id - 1].cambiarPrecio(imput)
            alertaAdministrador(id, "modificado")
        }
    } else if (imput == 2) {
        let id = prompt(`¿A que tratamiento le cambiamos el NOMBRE?\n(ingrese el número correspondiente)\n${tratamientosAdministrarConcat}`)

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

/*Hay un error al eliminar tratamientos, y es que use el length del array para obtener sus indices,
y al eliminarlos en el resto de menus no obtiene bien sus id respecto a lo que muestra el alert porq use array.length para determinarlos.
decidi dejarlo igual para que vean el uso de splice pero sepan que despues de usarlo el resto del codigo no tiene un correcto funcionamiento*/
    } else if (imput == 4) { 
        alert("Esta función rompe el resto de menus, explicacion en codigo linea 131")
        let idTratamientoARemover = prompt(`¿Qué tratamiento te gustaria eliminar?\n(ingrese el número correspondiente)\n${tratamientosAdministrarConcat}`)
        const tratamientoEliminado = tratamientos.splice(idTratamientoARemover, 1)
        console.log(tratamientoEliminado)
        alert(`El tratamiento:\nID: ${tratamientoEliminado[0].id}\nNombre: ${tratamientoEliminado[0].nombre}\nPrecio: ${tratamientoEliminado[0].precio}\nFue eliminado correctamente`)
        opcionesAdministrador()
    } else if(imput == 5) {
        menuPrincipal()
    } else {
        alert(`${nombre} La opción ingresada no existe`)
        opcionesAdministrador()        
    }
}

function crearNuevoTratamiento(nombre, precio) {
    const newTratamiento = new Tratamientos(nombre, precio)
    newTratamiento.pushearTratamiento()
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

function reservaTratamientos() {
    const tratamientosAdministrar = tratamientos.map(tratamiento => `[${tratamiento.id}] - ${tratamiento.nombre} - $${tratamiento.precio}`)
    const tratamientosAdministrarConcat = tratamientosAdministrar.join("\n")

    let imput = prompt(`¿Que tratamiento te gustaría realizar?\n(ingrese el número correspondiente)\n${tratamientosAdministrarConcat}\n\n[${tratamientosAdministrar.length + 1}] - Volver atras `)
    let eleccion = parseInt(tratamientos.findIndex((tratamiento) => tratamiento.id == imput))

    if (imput == tratamientosAdministrar.length + 1) {
        menuPrincipal()
    } else {
        if (eleccion == -1) {
            alert("Ingrese un número correcto")
            reservaTratamientos()
        } else {
            alertaTratamientos(tratamientos[eleccion])
            preguntaOtroTratamiento()
            }
    }
}

function alertaTratamientos(tratamiento) {

    carrito.masajes.push(tratamiento)
    carrito.cuentaTotal += tratamiento.precio

    alert(`${tratamiento.nombre}:
    - Costo: $${tratamiento.precio}
    
    - Cantidad de tratamientos: ${carrito.masajes.length}
    - Subtotal: $${carrito.cuentaTotal}`)
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
        reservaTratamientos();
    } else if (n == "2") {
        alert(`Muchas gracias, a continuación tus elecciones...`)
    } else {
        alert(`La opción elegida no es correcta`)
    }
}

function reservaTurno(cantidad) {
    let anio = 2023
    let mes = 0
    let dia = 0
    let hora = 0

    for (let i = 0; i < cantidad; i++) {
        do {

            let input = prompt(`Ingrese el DIA del mes para el tratamiento: \n ${[i + 1]} - ${carrito.masajes[i].nombre} \n [1 - 31]`)
            dia = parseInt(input);

        } while (isNaN(dia) || !(dia >= 1 && dia <= 31));

        do {
            let input = prompt(`DIA elegido: ${dia} \n Ingrese el MES para el tratamiento: \n ${[i + 1]} - ${carrito.masajes[i].nombre}
            [1] - ENERO             [7] - JULIO
            [2] - FEBRERO          [8] - AGOSTO
            [3] - MARZO            [9] - SEPTIEMBRE
            [4] - ABRIL               [10] - OCTUBRE
            [5] - MAYO              [11] - NOVIEMBRE
            [6] - JUNIO              [12] - DICIEMBRE `)
            mes = parseInt(input);
        } while (isNaN(mes) || !(mes >= 1 && mes <= 12));

        do {
            let input = prompt(`FECHA: ${dia}/${mes} \n Ingrese la HORA para el tratamiento: \n ${[i + 1]} - ${carrito.masajes[i].nombre} \n
            [Trabajamos de 9 a 17 horas]`)
            hora = parseInt(input);
        } while (isNaN(hora) || !(hora >= 9 && hora <= 17));

        const fechaReserva = new Date(anio, mes-1, dia, hora)
        carrito.masajes[i].cambiarFecha(fechaReserva)
        carrito.mensajeTurnos += `El tratamiento  ${[i + 1]} - ${carrito.masajes[i].nombre} sera el día: ${carrito.masajes[i].fecha.getDate()}/${carrito.masajes[i].fecha.getMonth()+1} ${carrito.masajes[i].fecha.getHours()}hs. \n`
    }
    alert(carrito.mensajeTurnos)
}


//MAIN//

const nombre = prompt(`Bienvenido a Galatea-Skin.
        -¿Cómo es tu nombre?`).toUpperCase()

if (nombre != "") {
    crearTratamientosDesdeArray(tratamientosIniciales)
    menuPrincipal()
} else {
    alert("Gracias por visitar Galatea-Skin")
}

if (carrito.masajes.length != 0) {

    const nombresTratamientos = carrito.masajes.map(tratamiento => tratamiento.nombre).join("\n")

    carrito.mensajeTratamientos = `${nombre}, has elegido los siguientes tratamientos:\n\n${nombresTratamientos} \n\n Cantidad de tratamientos: ${carrito.masajes.length} \n El total es: $${carrito.cuentaTotal}`

    alert(carrito.mensajeTratamientos)
    reservaTurno(carrito.masajes.length)
}

if (carrito.masajes.length != 0) {
    alert(`${carrito.mensajeTratamientos} \n \n ${carrito.mensajeTurnos} \n \n Agradecemos tu consulta y te esperamos para que disfrutes de nuestro trabajo.`)}