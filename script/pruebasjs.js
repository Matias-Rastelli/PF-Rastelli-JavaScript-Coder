const tratamientos = [
    { id: 0, name: "Masajes Descontracturantes", price: 1500, duration: 30 },
    { id: 1, name: "Masajes Relajantes", price: 2500, duration: 45 },
    { id: 2, name: "Vacumm", price: 3000, duration: 45 },
    { id: 3, name: "Limpieza Facial", price: 2000, duration: 30 },
]

class Tratamientos {

    constructor (id, name, price, duration){
        this.id = id
        this.name = name
        this.price = price
        this.duration = duration
        this.selled = false
    }

    buyTratamiento () {
        this.selled = true
    }

    changePrice (newPrice) {
        this.price = newPrice
    }
}

const tratamientosObj = [];

tratamientos.forEach(tratamiento => {
    const tratamientoObj = new Tratamientos(tratamiento.id, tratamiento.name, tratamiento.price, tratamiento.duration);
    tratamientosObj.push(tratamientoObj);
});

console.log(tratamientosObj)