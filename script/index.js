const tratamientos = []
const carrito = JSON.parse(localStorage.getItem('carrito')) || { cuenta: { subtotal: 0, descuento: 0, total: 0 }, tratamientos: [] };
const tratamientosIniciales = []
const cupones = [
    {key: "cupon10", value:0.10},
    {key: "cupon20", value:0.20},
    {key: "cupon50", value:0.50},
    {key: "cupon100", value:1}
]
const btnCupon = document.getElementById("btnCupon")
const inputCupon = document.getElementById("cupon")
const btnVolver = document.getElementById("boton-volver")
const modal = document.querySelector("#modal");
const btnPagar = document.getElementById("btnPagar")
const pagar = document.querySelector("#pagar")
const cancelar = document.querySelector("#cancelar")
const btnAdministrador = document.getElementById("btnAdministrador")

btnVolver.addEventListener("click", modoCompleto)

class Tratamientos {
    constructor(nombre, precio, categoria, descripcion) {
        this.id = tratamientos.length + 1
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.categoria = categoria
        this.descripcion = descripcion
        this.fecha = {
            dia: "##",
            mes: "##",
            anio: "####",
            turno: "##",
        }
        this.img = `./assets/img/${categoria}.png`
    }

    agregarCarrito(){
        if(carrito.tratamientos.length >= 6){
            swal({
                title: "Máximo de reservas alcanzado",
                text: "Lo siento, parece que ya tienes el máximo posible de reservas en tu carrito.",
                icon: "error",
                timer: 5000
            });
        } else{
            carrito.tratamientos.push(this)
        }
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
}

function pedirData (){
    fetch("./data/tratamientos.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(tratamiento => {
            tratamientosIniciales.push(tratamiento)
        });
        funcionesIniciales()
    })
}

function crearTratamientosDesdeArray(arrayTratamientos) {
    arrayTratamientos.forEach((tratamiento) => {
        const nuevoTratamiento = new Tratamientos(tratamiento.nombre, tratamiento.precio, tratamiento.categoria, tratamiento.descripcion);
        tratamientos.push(nuevoTratamiento);
    });
}

function filtrarPorCategoria(arrayTratamientos, categoria) {
    return arrayTratamientos.filter(elemento => elemento.categoria === categoria);
}

function renderPrincipal(contenedorPrincipal, categoria) {

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
            carrito.cuenta.subtotal += tratamiento.precio
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
    popoverActivo ? popoverActivo.remove() : null
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

function hover (parteCuerpoID, listadoID) {

    const parte = document.getElementById(parteCuerpoID)
    const contenedor = document.getElementById(listadoID)

        function hoverBody () {
            parte.style.filter = "brightness(2.5) hue-rotate(90deg)"
            contenedor.style.boxShadow = "0px 0px 10px 10px #c6838c"
        }

        function hoverOutBody(){
            parte.style.removeProperty("filter")
            contenedor.style.boxShadow = ""
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
        mostrar("boton-volver")
        estiloModoCompra(contenedorVisibleID)
        mostrar(contenedorVisibleID)
        ocultar(ocultar1ID)
        ocultar(ocultar2ID)
        ocultar(ocultar3ID)
    }

    visible.addEventListener("click", modoCompraEstilos)
    visibleCuerpo.addEventListener("click", modoCompraEstilos)
}

function modoCompleto(){

    ocultar("boton-volver")

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

function funcionesIniciales(){

    renderCarrito()
    validarCarrito()

    crearTratamientosDesdeArray(tratamientosIniciales)

    renderPrincipal("contenedorCabeza", "cabeza")
    renderPrincipal("contenedorManos", "manos")
    renderPrincipal("contenedorCuerpo", "cuerpo")
    renderPrincipal("contenedorPies", "pies")

    hover("imgCuerpoCabeza", "contenedorCabeza")
    hover("imgCuerpoCuerpo", "contenedorCuerpo")
    hover("imgCuerpoPies", "contenedorPies")
    hover("imgCuerpoManos", "contenedorManos")

    clickParaModoCompra("contenedorCabeza", "imgCuerpoCabeza", "contenedorManos", "contenedorCuerpo", "contenedorPies")
    clickParaModoCompra("contenedorManos", "imgCuerpoManos", "contenedorCabeza" , "contenedorCuerpo", "contenedorPies")
    clickParaModoCompra("contenedorCuerpo", "imgCuerpoCuerpo", "contenedorManos", "contenedorCabeza", "contenedorPies")
    clickParaModoCompra("contenedorPies", "imgCuerpoPies", "contenedorManos", "contenedorCuerpo", "contenedorCabeza")
}

window.onload = pedirData()