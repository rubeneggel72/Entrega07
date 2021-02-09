const fs = require('fs');
const express = require('express')
const app = express();
var contadorItems = 0
var contadorItemRandom = 0
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

app.get('/items', (req, res) => {
    (async () => {let itemsObject = await items()
    contadorItems++
    console.log("contador visitas a Items :" + contadorItems)
    res.send(itemsObject)})()
  })
  
app.get('/item-random', (req, res) => {
    (async () => {let itemRandomObject = await itemRandom()
    itemRandom()
    contadorItemRandom++
    console.log("contador de visitas a ItemRandom :" + contadorItemRandom)
    res.send(itemRandomObject)})()
  })

  app.get('/visitas', (req, res) => {
    let visitas = { items: contadorItems, item: contadorItemRandom }
    res.send(visitas)})

