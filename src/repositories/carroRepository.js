const { readFile, writeFile } = require('fs/promises');

class CarroRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find(itemId) {
    const all = await this._currentFileContent();
    if (!itemId) return null;

    return all.find(({ id }) => +itemId === id);
  }
  
  async findByModel(model) {
    const all = await this._currentFileContent();

    if (!model) return null;

    return all.find(({ modelo }) => model === modelo);
  }

  async findAll() {
    return await this._currentFileContent();
  }
  
  async create(data) {
    const currentFile = await this._currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }

  async delete(id) {
    try {
      const currentFile = await this._currentFileContent()
      let index = currentFile.findIndex(d => d.id === +id);
      currentFile.splice(index, 1)
      await writeFile(this.file, JSON.stringify(currentFile));
      return true;
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async update(id, data) {
    const carro = await this.find(id)

    if (!carro) return false

   Object.assign(carro, data)

   try {
    const currentFile = await this._currentFileContent()
    let index = currentFile.findIndex(d => d.id === +id);
    currentFile[index] = carro

    await writeFile(this.file, JSON.stringify(currentFile));
    return true;
   } catch (error) {
    console.log(error)
    return false
   }
  }
}

module.exports = CarroRepository;