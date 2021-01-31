const fs = require('fs');
const express = require('express')
const app = express();
var contador1 = 0
var contador2 = 0

class Archivo {
    constructor(nombre) {
        this.nombre = nombre;
    }
    async leer() {
        try {
            return JSON.parse(await fs.promises.readFile(this.nombre, 'utf-8')) || [];
        } catch (error) {
            console.log('No existe el archivo :' + this.nombre)
            let producto = []
            return producto;
        }
    }
}

async function items() {
    itemsArray = await miArchivo.leer()
    itemsObject = { item: itemsArray, cantidad: itemsArray.length }
    return itemsObject
}

async function itemRandom() {
    itemsArray = await miArchivo.leer()
    let itemRandom = itemsArray[randomInt(0, itemsArray.length)]
    itemRandomObject = { item: itemRandom }
    return itemRandomObject
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

const miArchivo = new Archivo("./productos.txt")
app.listen('3030', () => {
    console.log("el servidor está armado")
})
items()
app.get('/items', (req, res) => {
    items()
    contador1++
    console.log("contador 1 :" + contador1)
    res.send(itemsObject)

})

itemRandom()
app.get('/item-random', (req, res) => {
    itemRandom()
    contador2++
    console.log("contador 2 :" + contador2)
    res.send(itemRandomObject)
})

app.get('/visitas', (req, res) => {
    itemRandom()
    visitas = { items: contador1, item: contador2 }
    res.send(visitas)
})
