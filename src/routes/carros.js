const express = require('express')
const router = express.Router()

const CarroFactory = require('../factories/carroFactory');
const carroService = CarroFactory.generateInstance();
 
const Carro = require('../models/carro')

const exec = require('../utils')

// Busca Todos os Carros
router.get(
  '/',
  exec(async (req, res, next) => {
    let carros = await carroService.findAll()
    res.json(carros)
  })
)

// Busca Carro Por ID
router.get(
  '/:id(\\d+)',
  exec(async (req, res) => {
    let id = req.params.id

    let carro = await carroService.find(id)
    res.json(carro)
  })
)

// Busca Carros Por modelo
router.get(
  '/:modelo',
  exec(async (req, res) => {
    let modelo = req.params.modelo
    let carros = await carroService.getByModel(modelo)
    res.json(carros)
  })
)

// Cria Novo Carro
router.post(
  '/',
  exec(async (req, res) => {
    const carro = new Carro(req.body)

    const id = await carroService.create(carro)
   res.json(id)
  })
)

// Atualiza Carro
router.put(
  '/:id(\\d+)',
  exec(async (req, res) => {
    let id = req.params.id
    let carro = await carroService.update(id, req.body)
    res.json({ msg: 'Carro atualizado com sucesso' })
  })
)

// Deleta Um Carro
router.delete(
  '/:id(\\d+)',
  exec(async (req, res) => {
    let id = req.params.id
    let affectedRows = await carroService.delete(id)
    res.json({
      msg:
        affectedRows
          ? 'Carro deletado com sucesso'
          : 'Nenhum carro excluído',
    })
  })
)

module.exports = router
