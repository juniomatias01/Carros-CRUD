const CarroDB = require('../models/CarroDB')
const assert = require('assert')


describe('CarroDB', () => {
  describe('#getCarros()', () => {
    it('Teste da busca de carros', async () => {
      let carros = await CarroDB.getCarros()
      assert.ok(carros.length > 0)
    })
  })

  describe('#insertCarro()', () => {
    it('Teste para criar novo carro', async () => {
      let carro = {
        id:"1",
        placa:"2502",
        chassi:"123456",
        renavam:"1234567",
        modelo:"impala", 
        marca:"chevrolet", 
        ano:"1967"
      }
      let c = await CarroDB.insertCarro(carro)
      let id = c.id
      assert.ok(id > 0)
    })
  })
})
