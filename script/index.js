// simulador de pago y reserva de turnos de estetica //

const carrito = {cuentaTotal: 0, tratamientos: []}
const tratamientos = []

class Tratamientos {
    constructor(nombre, precio, categoria, descripcion) {
        this.id = tratamientos.length + 1
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.categoria = categoria
        this.descripcion = descripcion
        this.fecha = new Date()
        this.img = categoria
    }

    agregarCarrito(){
        carrito.tratamientos.push(this)
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
        nombre: "Hidratación capilar",
        precio: 3000,
        descripcion: "Tratamiento para hidratar y revitalizar el cabello seco y maltratado",
        categoria: "cabeza"
    },
    {
        nombre: "Nutrición capilar",
        precio: 4000,
        descripcion: "Tratamiento para nutrir y fortalecer el cabello debilitado y sin vida",
        categoria: "cabeza"
    },
    {
        nombre: "Queratina",
        precio: 5000,
        descripcion: "Tratamiento para alisar y reducir el frizz en el cabello",
        categoria: "cabeza"
    },
    {
        nombre: "Limpieza facial profunda",
        precio: 2000,
        descripcion: "Limpieza facial profunda para eliminar impurezas y células muertas",
        categoria: "cabeza"
    },
    {
        nombre: "Exfoliación facial",
        precio: 2500,
        descripcion: "Tratamiento para exfoliar y suavizar la piel del rostro",
        categoria: "cabeza"
    },
    {
        nombre: "Eliminación de puntos negros y espinillas",
        precio: 3000,
        descripcion: "Tratamiento para remover los puntos negros y espinillas del rostro",
        categoria: "cabeza"
    },
    {
        nombre: "Lifting facial",
        precio: 4500,
        descripcion: "Tratamiento para levantar y reafirmar la piel del rostro",
        categoria: "cabeza"
    },
    {
        nombre: "Microdermabrasión",
        precio: 3500,
        descripcion: "Tratamiento para exfoliar y mejorar la textura de la piel del rostro",
        categoria: "cabeza"
    },
    {
        nombre: "Radiofrecuencia facial",
        precio: 4000,
        descripcion: "Tratamiento para rejuvenecer y tonificar la piel del rostro",
        categoria: "cabeza"
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
    },
    {
        nombre: "Manicura básica",
        precio: 3000,
        descripcion: "Incluye limado, retirado de cutícula, esmaltado básico y masaje de manos.",
        categoria: "manos"
    },
    {
        nombre: "Manicura francesa",
        precio: 3500,
        descripcion: "Incluye limado, retirado de cutícula, esmaltado francés y masaje de manos.",
        categoria: "manos"
    },
    {
        nombre: "Parafina de manos",
        precio: 4000,
        descripcion: "Tratamiento para hidratar y suavizar la piel de las manos, utilizando parafina caliente.",
        categoria: "manos"
    },
    {
        nombre: "Manos de seda",
        precio: 2500,
        descripcion: "Tratamiento para suavizar e hidratar la piel de las manos, utilizando una mezcla especial de productos.",
        categoria: "manos"
    },
    {
        nombre: "Manicura spa",
        precio: 4500,
        descripcion: "Incluye limado, retirado de cutícula, exfoliación, mascarilla hidratante, masaje y esmaltado básico.",
        categoria: "manos"
    }
]

function crearTratamientosDesdeArray(arrayTratamientos) {
    arrayTratamientos.forEach((tratamiento) => {
        const nuevoTratamiento = new Tratamientos(tratamiento.nombre, tratamiento.precio, tratamiento.categoria, tratamiento.descripcion);
        tratamientos.push(nuevoTratamiento);
    });
}

function filtrarPorCategoria(arrayTratamientos, categoria) {
    return arrayTratamientos.filter(elemento => elemento.categoria === categoria);
}


function renderPrinipal(contenedorPrincipal, categoria) {
    
    const contenedor = document.getElementById(contenedorPrincipal)
    const tratamientosFiltrado = filtrarPorCategoria(tratamientos, categoria)

    contenedorCategoria = document.createElement("div")
    contenedor.appendChild(contenedorCategoria)
    contenedorCategoria.classList.add("contenedorCategoria")

    tratamientosFiltrado.forEach((tratamiento) => {
        const itemContenedor = document.createElement("div")
        itemContenedor.classList.add("item", "itemListado")
        itemContenedor.innerHTML = ` 
            <p class="itemParaComprar__Nombre">${tratamiento.nombre}</p>
            <img src="./assets/img/info.png" alt="info tratamiento" class="imgInfo">
            <p class="itemParaComprar__Precio">$${tratamiento.precio}</p>
            <img src="./assets/img/carrito.png" alt="comprar" class="imgCarrito">
            `

        const imgCarrito = itemContenedor.querySelector(".imgCarrito");
        imgCarrito.addEventListener("click", () => {
            tratamiento.agregarCarrito()
            carrito.cuentaTotal += tratamiento.precio
            // evento que muestre que se agrego
            renderCarrito()
            validarCarrito()
        })

        const imgInfo = itemContenedor.querySelector(".imgInfo");
        imgInfo.addEventListener("click", () => {
            
            popoverActivo()

            const popover = document.createElement("div")
            popover.classList.add("popover", "popoverActivo")
            popover.innerHTML = `
                <div class="popoverHeader">
                    <h3>${tratamiento.nombre}</h3>
                    <div class="cerrarPopover">
                        <svg viewBox="0 0 256 256">
                        <path fill="currentColor" d="M168.49 104.49L145 128l23.52 23.51a12 12 0 0 1-17 17L128 145l-23.51 23.52a12 12 0 0 1-17-17L111 128l-23.49-23.51a12 12 0 0 1 17-17L128 111l23.51-23.52a12 12 0 0 1 17 17ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108Zm-24 0a84 84 0 1 0-84 84a84.09 84.09 0 0 0 84-84Z"/>
                        </svg>
                    </div>
                </div>
                <div class="popoverBody">
                    <p>${tratamiento.descripcion}</p>
                </div>
                `
            itemContenedor.appendChild(popover)

            const cerrarPopover = popover.querySelector(".cerrarPopover")
            cerrarPopover.addEventListener("click", () => {
                popover.remove();
            })
        })

        contenedorCategoria.appendChild(itemContenedor)
    })
}

function popoverActivo() {
    const popoverActivo = document.querySelector(".popoverActivo")
    if (popoverActivo) {
        popoverActivo.remove()
    }
}

function renderCarrito(){
    const carritoTratamientos = document.getElementById("carrito__tratamientos")

    carritoTratamientos.innerHTML = ""

    carrito.tratamientos.forEach((tratamiento) => {
        if (tratamiento.nombre.length > 28) {
            tratamiento.nombre = tratamiento.nombre.substring(0, 26) + '..';
        }
        const divItem = document.createElement("div")
        divItem.classList.add("carrito__tratamientos__item")
        divItem.innerHTML = `
            <div class="item__tipo__tratamiento">
            </div>
            <div class="item__info">
                <p class="item__nombre">${tratamiento.nombre}</p>
                <div class="item__fecha">
                    <p>Fecha: 
                        <span class="item__fecha__dia">##</span>
                        /
                        <span class="item__fecha__mes">##</span>
                        /
                        <span class="item__fecha__año">##</span>
                        --
                        <span class="item__fecha__hora">##</span> hs.
                    </p>
                    <div class="item__fecha__boton"><svg width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M208 34h-26V24a6 6 0 0 0-12 0v10H86V24a6 6 0 0 0-12 0v10H48a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14ZM48 46h26v10a6 6 0 0 0 12 0V46h84v10a6 6 0 0 0 12 0V46h26a2 2 0 0 1 2 2v34H46V48a2 2 0 0 1 2-2Zm160 164H48a2 2 0 0 1-2-2V94h164v114a2 2 0 0 1-2 2Zm-98-90v64a6 6 0 0 1-12 0v-54.29l-7.32 3.66a6 6 0 1 1-5.36-10.74l16-8A6 6 0 0 1 110 120Zm59.57 29.25L148 178h20a6 6 0 0 1 0 12h-32a6 6 0 0 1-4.8-9.6L160 142a10 10 0 1 0-16.65-11a6 6 0 1 1-10.35-6a22 22 0 1 1 36.62 24.26Z"/></svg></div>
                </div>
            </div>
            <div class="item__precio__eliminar">
            <div class="item__eliminar"><svg width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M168.49 104.49L145 128l23.52 23.51a12 12 0 0 1-17 17L128 145l-23.51 23.52a12 12 0 0 1-17-17L111 128l-23.49-23.51a12 12 0 0 1 17-17L128 111l23.51-23.52a12 12 0 0 1 17 17ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108Zm-24 0a84 84 0 1 0-84 84a84.09 84.09 0 0 0 84-84Z"/></svg></div>
                <p class="item__precio">$${tratamiento.precio}</p>
            </div>
        `
        const eliminar = divItem.querySelector(".item__eliminar")
        eliminar.addEventListener("click", () => {
            const index = carrito.tratamientos.indexOf(tratamiento)
            carrito.tratamientos.splice(index, 1)
            carrito.cuentaTotal -= tratamiento.precio
            total()
            renderCarrito()
            validarCarrito()
        })
        total()
        carritoTratamientos.appendChild(divItem)
    })
}

function total(){
    const total = document.getElementById("total")
    total.textContent = `Total: $${carrito.cuentaTotal}`
}


function estiloModoCompra(contenedor) {
    const contenedorPrincipal = document.getElementById(contenedor);
    const listadoTratamientos = contenedorPrincipal.querySelector(".contenedorCategoria");
    const itemListado = listadoTratamientos.querySelectorAll(".item");

    itemListado.forEach((elemento) => {
        elemento.classList.remove("itemListado");
        elemento.classList.add("itemParaComprar");
    });
}

function estiloModoListado(contenedor) {
    const contenedorPrincipal = document.getElementById(contenedor);
    const listadoTratamientos = contenedorPrincipal.querySelector(".contenedorCategoria");
    const itemListado = listadoTratamientos.querySelectorAll(".item");

    itemListado.forEach((elemento) => {
        elemento.classList.add("itemListado");
        elemento.classList.remove("itemParaComprar");
    });
}

function ocultar(contenedorID){
    const objeto = document.getElementById(contenedorID)
    objeto.style.display = "none"
}

function mostrar(contenedorID){
    const objeto = document.getElementById(contenedorID)
    objeto.style.display = "flex"
}


function validarCarrito(){
    const sectorCompra = document.getElementById("sectorCompra")

    if(carrito.tratamientos.length == 0) {
        sectorCompra.style.width = "100%"
        ocultar("carrito")
    } else {
        mostrar("carrito")
        sectorCompra.style.width = "70%"
    }
}

function hover (parteCuerpoID, listadoID) {
    
    const parte = document.getElementById(parteCuerpoID)
    const contenedor = document.getElementById(listadoID)

        function hoverBody () {
            parte.style.filter = "brightness(3)"
            contenedor.style.backgroundColor = "lightblue"
        }

        function hoverOutBody(){
            parte.style.removeProperty("filter")
            contenedor.style.backgroundColor = ""
        }

        parte.addEventListener("mouseover", hoverBody)    
        parte.addEventListener("mouseout", hoverOutBody)    
        contenedor.addEventListener("mouseover", hoverBody)    
        contenedor.addEventListener("mouseout", hoverOutBody)
}

function clickParaModoCompra(contenedorVisibleID, ParteCuerpoClick, ocultar1ID, ocultar2ID, ocultar3ID) {
    const visible = document.getElementById(contenedorVisibleID);
    const visibleCuerpo = document.getElementById(ParteCuerpoClick);



    function modoCompraEstilos() {
        btnModoCompleto.style.display = "flex"
        estiloModoCompra(contenedorVisibleID)
        mostrar(contenedorVisibleID)
        ocultar(ocultar1ID)
        ocultar(ocultar2ID)
        ocultar(ocultar3ID)
        // eliminar evento Hover
        // agrandar cuerpo o zoom zona
    }

    visible.addEventListener("click", modoCompraEstilos)
    visibleCuerpo.addEventListener("click", modoCompraEstilos)
}

const btnModoCompleto = document.getElementById("boton-volver")
btnModoCompleto.addEventListener("click", modoCompleto)

function modoCompleto(){

    btnModoCompleto.style.display = "none"

    popoverActivo()

    mostrar("contenedorCabeza")
    mostrar("contenedorManos")
    mostrar("contenedorCuerpo")   
    mostrar("contenedorPies")
    
    estiloModoListado("contenedorCabeza")
    estiloModoListado("contenedorManos")
    estiloModoListado("contenedorCuerpo")   
    estiloModoListado("contenedorPies")    

    clickParaModoCompra("contenedorCabeza", "imgCuerpoCabeza", "contenedorManos", "contenedorCuerpo", "contenedorPies")
    clickParaModoCompra("contenedorManos", "imgCuerpoManos", "contenedorCabeza" , "contenedorCuerpo", "contenedorPies")
    clickParaModoCompra("contenedorCuerpo", "imgCuerpoCuerpo", "contenedorManos", "contenedorCabeza", "contenedorPies")
    clickParaModoCompra("contenedorPies", "imgCuerpoPies", "contenedorManos", "contenedorCuerpo", "contenedorCabeza")
}




window.onload = funcionesIniciales()

function funcionesIniciales(){

    crearTratamientosDesdeArray(tratamientosIniciales)

    renderPrinipal("contenedorCabeza", "cabeza")
    renderPrinipal("contenedorManos", "manos")
    renderPrinipal("contenedorCuerpo", "cuerpo")
    renderPrinipal("contenedorPies", "pies")
    
    hover("imgCuerpoCabeza", "contenedorCabeza")
    hover("imgCuerpoCuerpo", "contenedorCuerpo")
    hover("imgCuerpoPies", "contenedorPies")
    hover("imgCuerpoManos", "contenedorManos")
    
    validarCarrito()

    clickParaModoCompra("contenedorCabeza", "imgCuerpoCabeza", "contenedorManos", "contenedorCuerpo", "contenedorPies")
    clickParaModoCompra("contenedorManos", "imgCuerpoManos", "contenedorCabeza" , "contenedorCuerpo", "contenedorPies")
    clickParaModoCompra("contenedorCuerpo", "imgCuerpoCuerpo", "contenedorManos", "contenedorCabeza", "contenedorPies")
    clickParaModoCompra("contenedorPies", "imgCuerpoPies", "contenedorManos", "contenedorCuerpo", "contenedorCabeza")

}