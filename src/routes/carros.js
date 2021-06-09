const express = require('express')
const router = express.Router()
const CarroDB = require('../models/CarroDB')
const exec = require('./utils')

// Busca Todos os Carros
router.get(
  '/',
  exec(async (req, res, next) => {
    let carros = await CarroDB.getCarros()
    res.json(carros)
  })
)

// Busca Carro Por ID
router.get(
  '/:id(\\d+)',
  exec(async (req, res) => {
    let id = req.params.id
    let carro = await CarroDB.getCarroById(id)
    res.json(carro)
  })
)

// Busca Carros Por modelo
router.get(
  '/:modelo',
  exec(async (req, res) => {
    let modelo = req.params.modelo
    let carros = await CarroDB.getCarrosByType(modelo)
    res.json(carros)
  })
)

// Cria Novo Carro
router.post(
  '/',
  exec(async (req, res) => {
    let carro = await CarroDB.insertCarro(req.body)
    res.json(carro)
  })
)

// Atualiza Carro
router.put(
  '/',
  exec(async (req, res) => {
    let carro = await CarroDB.updateCarro(req.body)
    res.json({ msg: 'Carro atualizado com sucesso' })
  })
)

// Deleta Um Carro
router.delete(
  '/:id(\\d+)',
  exec(async (req, res) => {
    let id = req.params.id
    let affectedRows = await CarroDB.deleteCarroById(id)
    res.json({
      msg:
        affectedRows > 0
          ? 'Carro deletado com sucesso'
          : 'Nenhum carro excluído',
    })
  })
)

module.exports = router
