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
            popoverActivo()

            const divCalendario = document.createElement("div")
            divCalendario.classList.add("modalFecha")
            divCalendario.classList.add("popoverActivo")
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
                            title: "Error en la fecha",
                            text: "Lo siento, parece que ya tienes un turno programado para la misma fecha y hora o la ingresada es incorrecta.",
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

function limitadorFecha() {
    const fechaActual = new Date().toISOString().split('T')[0];

    const limite30dias = new Date()
    limite30dias.setDate(limite30dias.getDate() + 30)
    const fechaLimite = limite30dias.toISOString().split('T')[0]

    document.querySelector(".fecha").min = fechaActual
    document.querySelector(".fecha").max = fechaLimite
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

function total(){
    const total = document.getElementById("total")
    carrito.cuenta.total = carrito.cuenta.subtotal - carrito.cuenta.descuento
    total.innerHTML = `
    <p class = "subtotal">Subtotal: $${carrito.cuenta.subtotal}</p>
    <p class = "descuento">Descuento: $${carrito.cuenta.descuento}</p>
    <p class = "total">Total: $${carrito.cuenta.total}</p>
    `
}

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
btnCupon.addEventListener("click", aplicarCupon)