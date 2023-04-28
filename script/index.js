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

function renderCarrito(){

    const carritoTratamientos = document.getElementById("carrito__tratamientos")

    carritoTratamientos.innerHTML = ""

    carrito.tratamientos.forEach((tratamiento) => {

        tratamiento.nombre.length > 28 ? tratamiento.nombre = tratamiento.nombre.substring(0, 26) + `..` : tratamiento.nombre
        
        const divItem = document.createElement("div")
        divItem.classList.add("carrito__tratamientos__item")
        divItem.innerHTML = `
            <div class="item__tipo__tratamiento">
                <img src="${tratamiento.img}" alt="${tratamiento.categoria}">
            </div>
            <div class="item__info">
                <p class="item__nombre">${tratamiento.nombre}</p>
                <div class="item__fecha">
                    <p>Fecha: 
                        <span class="item__fecha__dia">${tratamiento.fecha.dia}</span>
                        /
                        <span class="item__fecha__mes">${tratamiento.fecha.mes}</span>
                        /
                        <span class="item__fecha__año">${tratamiento.fecha.anio}</span>
                        --
                        <span class="item__fecha__hora">${tratamiento.fecha.turno}</span> hs.
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
            carrito.cuenta.subtotal -= tratamiento.precio
            aplicarCupon()
            renderCarrito()
            validarCarrito()
        })

        const calendario = divItem.querySelector(".item__fecha__boton")
        calendario.addEventListener("click", crearCalendario)

            function crearCalendario(){
            const divCalendario = document.createElement("div")
            divCalendario.classList.add("modalFecha")
            divCalendario.innerHTML = `
                <form action="/enviar" method="post">
                    <h3>ELEGIR TURNO:</h3>

                    <label for="fecha">Fecha:</label>
                    <input type="date" class="fecha" name="fecha">

                    <label for="turnos">Turno:</label>
                    <select class="turnos" name="turnos">
                        <option value="">Elija un turno</option>
                        <option value="9">09:00 hs</option>
                        <option value="10">10:00 hs</option>
                        <option value="11">11:00 hs</option>
                        <option value="12">12:00 hs</option>
                        <option value="13">13:00 hs</option>
                        <option value="14">14:00 hs</option>
                        <option value="15">15:00 hs</option>
                        <option value="16">16:00 hs</option>
                        <option value="17">17:00 hs</option>
                        <option value="18">18:00 hs</option>
                    </select>
                    <button class="btnGuardarFecha">Guardar</button>
                </form>
                `
                divItem.appendChild(divCalendario)
                limitadorFecha()

                const btnGuardarFecha = document.querySelector(".btnGuardarFecha")
                btnGuardarFecha.addEventListener("click", (e) => {
                    e.preventDefault()
                    const fecha = document.querySelector(".fecha").value
                    const turno = document.querySelector(".turnos").value
                    const fechaSeparada = fecha.split("-")
                    
                    const fechaAValidar = {
                        dia: fechaSeparada[2] ?? "##",
                        mes: fechaSeparada[1] ?? "##",
                        anio: fechaSeparada[0] ? fechaSeparada[0] : "####",
                        turno: turno ? turno : "##"
                    }

                    if (validarFecha(fechaAValidar)){
                        tratamiento.fecha.turno = turno ? turno : "##"
                        tratamiento.fecha.dia = fechaSeparada[2] ?? "##"
                        tratamiento.fecha.mes = fechaSeparada[1] ?? "##"
                        tratamiento.fecha.anio = fechaSeparada[0] ? fechaSeparada[0] : "####"
                    } else{
                        swal({
                            title: "Fecha duplicada",
                            text: "Lo siento, parece que ya tienes un turno programado para la misma fecha y hora.",
                            icon: "error",
                            timer: 5000
                        });
                        tratamiento.fecha.turno = "##"
                        tratamiento.fecha.dia = "##"
                        tratamiento.fecha.mes = "##"
                        tratamiento.fecha.anio = "####"
                    }                    
                    renderCarrito()
                    validarCarrito()
                })
        }



        aplicarCupon()
        carritoTratamientos.appendChild(divItem)
    })
}
function validarFecha(fechaRevisar) {
    let fechaValida = true
    const fechaARevisar = JSON.stringify(fechaRevisar)
    carrito.tratamientos.forEach((tratamiento) => {
        const fecha = JSON.stringify(tratamiento.fecha)
        if (fechaARevisar === fecha) {
            fechaValida = false
        }
    })
    return fechaValida
}
function limitadorFecha() {
    const fechaActual = new Date().toISOString().split('T')[0];

    const limite30dias = new Date()
    limite30dias.setDate(limite30dias.getDate() + 30)
    const fechaLimite = limite30dias.toISOString().split('T')[0]

    document.querySelector(".fecha").min = fechaActual
    document.querySelector(".fecha").max = fechaLimite
}

function total(){
    const total = document.getElementById("total")
    carrito.cuenta.total = carrito.cuenta.subtotal - carrito.cuenta.descuento
    total.innerHTML = `
    <p class = "subtotal">Subtotal: $${carrito.cuenta.subtotal}</p>
    <p class = "descuento">Descuento: $${carrito.cuenta.descuento}</p>
    <p class = "total">Total: $${carrito.cuenta.total}</p>
    `
}




btnCupon.addEventListener("click", aplicarCupon)

function aplicarCupon(){
    const index = cupones.findIndex((cupon) => cupon.key === inputCupon.value)
    index != -1 ? cuponValido() : cuponInvalido()

    function cuponValido(){
        inputCupon.style.border = "1px green solid"
        carrito.cuenta.descuento = carrito.cuenta.subtotal * cupones[index].value
        total()
    }

    function cuponInvalido(){
        inputCupon.value === "" ? inputCupon.style.border = "1px yellow solid" : inputCupon.style.border = "1px red solid"
        carrito.cuenta.descuento = 0
        carrito.cuenta.total = carrito.cuenta.subtotal
        total()
    }
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

    localStorage.setItem("carrito", JSON.stringify(carrito))
    const sectorCompra = document.getElementById("sectorCompra")

    if(carrito.tratamientos.length == 0){
        sectorCompra.style.width = "100%"
        ocultar("carrito")
        inputCupon.value = ""
    } else {
        sectorCompra.style.width = "70%", mostrar("carrito")
    }
    desactivarBoton()
}

function hover (parteCuerpoID, listadoID) {

    const parte = document.getElementById(parteCuerpoID)
    const contenedor = document.getElementById(listadoID)

        function hoverBody () {
            parte.style.filter = "brightness(3)"
            contenedor.style.boxShadow = "0px 0px 10px 10px lightblue"
            
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


btnVolver.addEventListener("click", modoCompleto)

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



function desactivarBoton () {
    for (let i = 0; i < carrito.tratamientos.length; i++) {
        if (carrito.tratamientos[i].fecha.dia == "##" || carrito.tratamientos[i].fecha.turno == "##") {
            btnPagar.disabled = true
            btnPagar.classList.add("disabled")
            return
        }
    }
    btnPagar.disabled = false
    btnPagar.classList.remove("disabled")
}

btnPagar.addEventListener("click", () => {

    const modalBodyTratamientos = document.querySelector(".modal__body__tratamientos")
    modalBodyTratamientos.innerHTML = ""

        carrito.tratamientos.forEach((tratamiento) =>{
            const {nombre, fecha} = tratamiento
            const tratamientoModal = document.createElement("div")
            
            tratamientoModal.classList = "tratamiento__modal"
            tratamientoModal.innerHTML = `
            <div class="tratamiento__modal">
            <span class="tratamiento__modal__nombre" >${nombre} </span>
            <span class="tratamiento__modal__fecha"> ${fecha.dia} / ${fecha.mes} / ${fecha.anio} - ${fecha.turno} Hs.</span>
            </div>
            `
            modalBodyTratamientos.appendChild(tratamientoModal)
            renderPreciosModal()
            modal.close()  //tuve que cerrar primero el modal porq a veces me daba error como que ya estaba abierto
            modal.showModal()
            
        })
    }
)

function renderPreciosModal() {
    const { subtotal, descuento, total } = carrito.cuenta

    const subtotalElement = document.querySelector(".modal__footer__totales__subtotal")
    const descuentoElement = document.querySelector(".modal__footer__totales__descuento")
    const totalElement = document.querySelector(".modal__footer__totales__total")

    subtotalElement.innerHTML = `Subtotal: $${subtotal}`
    descuentoElement.innerHTML = `Descuento: $${descuento}`
    totalElement.innerHTML = `Total: $${total}`
}



pagar.addEventListener('click', () => {
    modal.close();
    carrito.tratamientos = []
    carrito.cuenta.subtotal = 0
    localStorage.clear()
    validarCarrito()
    location.reload()
});
cancelar.addEventListener('click', () => {
    modal.close()
});

window.onload = pedirData()

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



btnAdministrador.addEventListener("click", ()=> {
    document.body.innerHTML = `
        <header>
            <a href="./index.html"><h1>GALATEA SKIN</h1></a> 
            <img src="./assets/img/admin.svg" alt="Opciones Administrador" id="btnAdministrador">
        </header>
        <main>

            <table class="body-tabla">
                <thead>
                    <tr>
                        <th>ID</thstyle=>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>EDITAR</th>
                    </tr>
                </thead>
            </table>
        </main>
        <footer>
            <div class="redesSociales">
                <img src="./assets/img/facebook.png" alt="">
                <img src="./assets/img/instagram.png" alt="">
                <img src="./assets/img/wsp.png" alt="">
            </div>
            <p>COPYRIGHT - TODOS LOS DERECHOS RESERVADOS</p>
        </footer>
    ` 
    crearTabla()
    ocultar("btnAdministrador")
})
function crearTabla() {
    
    const tabla = document.querySelector(".body-tabla")

    // const tablaFiltrada = tratamientos.filter(elemento => elemento.categoria === "pies") prueba de filtrado

    tratamientos.forEach((tratamiento) => {
        const {id, nombre, descripcion, precio, categoria} = tratamiento
        const itemTabla = document.createElement("tr")
        itemTabla.innerHTML = ` 
        <td>${id} </td>
        <td>${nombre} </td>
        <td>${descripcion} </td>
        <td>$${precio} </td>
        <td>${categoria} </td>
        <td><button class="boton-editar">EDITAR</button></th>
        `
        tabla.appendChild(itemTabla)
        
        const btnEditar = itemTabla.querySelector(".boton-editar")
        btnEditar.addEventListener("click", ()=>{
            editarTratamiento(tratamiento)
        })
    })
}

function editarTratamiento (tratamiento){

    let nuevoX = prompt(`ingresa el nuevo X para el tratamiento ${tratamiento.nombre}, con id: ${tratamiento.id}`)
    tratamiento.cambiarPrecio(nuevoX)

    const tabla = document.querySelector(".body-tabla")
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>ID</thstyle=>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>EDITAR</th>
            </tr>
        </thead>
        `
    crearTabla()
}