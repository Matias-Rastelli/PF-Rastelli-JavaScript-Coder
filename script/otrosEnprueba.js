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

function crearNuevoTratamiento(nombre, precio) {
    const newTratamiento = new Tratamientos(nombre, precio)
    newTratamiento.pushearTratamiento()
}

const imgInfo = itemContenedor.querySelector(".imgInfo")
        imgInfo.addEventListener("click", () => {
        
        const divPopover = document.createElement('div');
        divPopover.classList.add("popover");
        divPopover.innerHTML = `
            <div class="popoverHeader">
                <h3>${tratamiento.nombre}</h3>
                <div class="cerrarPopover"><svg width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M168.49 104.49L145 128l23.52 23.51a12 12 0 0 1-17 17L128 145l-23.51 23.52a12 12 0 0 1-17-17L111 128l-23.49-23.51a12 12 0 0 1 17-17L128 111l23.51-23.52a12 12 0 0 1 17 17ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108Zm-24 0a84 84 0 1 0-84 84a84.09 84.09 0 0 0 84-84Z"/></svg></div>
            </div>
            <div class="popoverBody">
                <p>${tratamiento.descripcion}</p>
            </div>`

            const item = document.querySelector("itemParaComprar")
            item.appendChild(divPopover)