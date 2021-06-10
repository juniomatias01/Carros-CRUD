class CarroService {
    constructor({ carroRepository }) {
      this.carroRepository = carroRepository;
    }
  
    async findAll() {
      return this.carroRepository.findAll();
    }

    async find(itemId) {
      return this.carroRepository.find(itemId);
    }
  

    async getByModel(model) {
      return this.carroRepository.findByModel(model);
    }

    async create(data) {
      return this.carroRepository.create(data);
    }

    async update(id, data) {
      return this.carroRepository.update(id, data);
    }

    async delete(id) {
      return this.carroRepository.delete(id);
    }
  }
  
  module.exports = CarroService;