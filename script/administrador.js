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

function validarEdicion(nombre, precio, categoria, descripcion){

    let mensaje = ""

    if(nombre == "" || nombre.length > 20){
        mensaje+= `El nombre indicado no es correcto. \n`
    }
    if(isNaN(precio) || precio <= 0){
        mensaje+= `El precio tiene que ser mayor a 0, o has puesto caracteres incorrectos. \n`
    }
    if(categoria == "cabeza" || categoria == "pies" || categoria == "cuerpo" || categoria == "manos"){
        
    }else{
        mensaje+= `La categoria ingresada no es correcta. \n`
    }
    if(descripcion.length > 200){
        mensaje+= `La descripción es muy larga.`
    }
    return mensaje
}

function editarTratamiento (tratamiento){

    const editarElement = document.createElement("div")
    editarElement.classList.add("editarElement")
    editarElement.innerHTML = `
        <h2>EDICION DE TRATAMIENTOS</h2>
        <form action="">
            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" id="nuevoNombre" value="${tratamiento.nombre}">
            <label for="precio">Precio:</label>
            <input type="number" name="precio" id="nuevoPrecio" value="${tratamiento.precio}">
            <label for="categoria">Categoria: (posibles categorias: [cabeza][pies][cuerpo][manos])</label>
            <input type="text" name="categoria" id="nuevoCategoria" value="${tratamiento.categoria}">
            <label for="descripcion">Descripción:</label>
            <textarea name="descripcion" id="nuevoDescripcion" cols="30" rows="5" >${tratamiento.descripcion}</textarea>
            <input type="button" value="Guardar Cambios" id="btnGuardarEdicion">
            <input type="button" value="Cancelar" id="btnCancelarEdicion">

        </form>            
    `
    document.body.appendChild(editarElement)

    const nuevoNombre = document.getElementById("nuevoNombre")
    const nuevoPrecio = document.getElementById("nuevoPrecio")
    const nuevoCategoria = document.getElementById("nuevoCategoria")
    const nuevoDescripcion = document.getElementById("nuevoDescripcion")
    const btnGuardarEdicion = document.getElementById("btnGuardarEdicion")
    const btnCancelarEdicion = document.getElementById("btnCancelarEdicion")
    const tabla = document.querySelector(".body-tabla")

    btnCancelarEdicion.addEventListener("click", ()=> editarElement.remove() )
    btnGuardarEdicion.addEventListener("click", ()=>{
        const validar = validarEdicion(nuevoNombre.value, nuevoPrecio.value, nuevoCategoria.value, nuevoDescripcion.value)
        if(validar == ""){

            tratamiento.cambiarNombre(nuevoNombre.value)
            tratamiento.cambiarPrecio(nuevoPrecio.value)
            tratamiento.cambiarCategoria(nuevoCategoria.value)
            tratamiento.cambiarDescripcion(nuevoDescripcion.value)
        
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
            
            editarElement.remove()
            crearTabla()
            swal({
                title: "El tratamiento fue editado con éxito",
                icon: "success",
                timer: 5000
            });
        } else{
            swal({
                title: "Error en los datos ingresados",
                text: validar,
                icon: "error",
                timer: 5000
            });
        }
    })
}

