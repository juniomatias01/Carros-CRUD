const CarroRepository = require('./../repositories/carroRepository');
const CarroService = require('./../services/carroService');

const { join } = require('path');
const filename = join(__dirname, '../../database', 'data.json');

const generateInstance = () => {
  const carroRepository = new CarroRepository({
    file: filename,
  });
  
  const carroService = new CarroService({
    carroRepository,
  });

  return carroService;
};

module.exports = { generateInstance };