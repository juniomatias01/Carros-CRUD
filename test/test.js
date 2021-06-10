const assert = require("assert");

const CarroFactory = require("../src/factories/carroFactory");
const carroService = CarroFactory.generateInstance();

const Carro = require("../src/models/carro");

describe("CarroDB", () => {
  describe("#getCarros()", () => {
    it("Teste da busca de carros", async () => {
      let carros = await carroService.findAll();
      assert.ok(carros.length > 0);
    });
  });

  describe("#insertCarro()", () => {
    it("Teste para criar novo carro", async () => {
      let carro = new Carro({
        placa: "2502",
        chassi: "123456",
        renavam: "1234567",
        modelo: "impala",
        marca: "chevrolet",
        ano: "1967",
      });

      const id = await carroService.create(carro);

      assert.ok(id > 0);
    });
  });

  describe("#updateCarro()", () => {
    it("Atualizar dados do carro", async () => {
      let carro = new Carro({
        placa: "test",
        chassi: "test",
        renavam: "test",
        modelo: "test",
        marca: "test",
        ano: "test",
      });

      const id = await carroService.create(carro);

      const carroUpdate = await carroService.update(id, {
        modelo: "testUpdate",
        marca: "testUpdate",
        ano: "testUpdate"
      });

      assert(carroUpdate, true);
    });
  });

  describe("#updateCarro()", () => {
    it("Excluir carro pelo id", async () => {
      let carro = new Carro({
        placa: "test",
        chassi: "test",
        renavam: "test",
        modelo: "test",
        marca: "test",
        ano: "test",
      });

      const id = await carroService.create(carro);

      const carroDeleted = await carroService.delete(id);

      assert(carroDeleted, true);
    });
  });
});
