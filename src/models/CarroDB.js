const mysql = require('mysql')
const config = require('../config/default.json')


// CarroDB Class
class CarroDB {
  // Conexão Com o Banco de Dados
  static connect() {
    let connection = mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    })
    connection.connect()
    return connection
  }

  // Lista Todos os Carros
  static getCarros(callback) {
    return new Promise((resolve, reject) => {
      let connection = CarroDB.connect()
      let sql = 'select * from carro'
      let query = connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
      console.log(query.sql)
      connection.end()
    })
  }

  // Busca Carro By Type
  static getCarrosByType(modelo, callback) {
    return new Promise((resolve, reject) => {
      let connection = CarroDB.connect()
      let sql = `select id, modelo, tipo from carro where tipo = "${modelo}"`
      let query = connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
      console.log(query.sql)
      connection.end()
    })
  }

  // Busca Carro By ID
  static getCarroById(id, callback) {
    return new Promise((resolve, reject) => {
      let connection = CarroDB.connect()
      let sql = 'select * from carro where id = ?'
      let query = connection.query(sql, id, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          if (results.length == 0) {
            reject(Error('Nenhum carro encontrado'))
            return
          }
          let carro = results[0]
          resolve(carro)
        }
      })
      console.log(query.sql)
      connection.end()
    })
  }

  // Cria Novo Carro
  static insertCarro(carro, callback) {
    return new Promise((resolve, reject) => {
      let connection = CarroDB.connect()
      let sql = 'insert into carro set ?'
      let query = connection.query(sql, carro, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          carro.id = results.insertId
          resolve(carro)
        }
      })
      console.log(query.sql)
      connection.end()
    })
  }

  // Update Carro
  static updateCarro(carro, callback) {
    return new Promise((resolve, reject) => {
      let connection = CarroDB.connect()
      let sql = 'update carro set ? where id = ?'
      let id = carro.id
      let query = connection.query(
        sql,
        [carro, id],
        (error, results, fields) => {
          if (error) {
            reject(error)
          } else {
            resolve(carro)
          }
        }
      )
      console.log(query.sql)
      connection.end()
    })
  }

  // Deleta Carro
  static deleteCarro(carro, callback) {
    return new Promise((resolve, reject) => {
      let connection = CarroDB.connect()
      let sql = 'delete from carro where id = ?'
      let id = carro.id
      let query = connection.query(sql, id, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(carro)
        }
      })
      console.log(query.sql)
      connection.end()
    })
  }

  // Deleta Carro By Id
  static deleteCarroById(id, callback) {
    return new Promise((resolve, results) => {
      let connection = CarroDB.connect()
      let sql = 'delete from carro where id = ?'
      let query = connection.query(sql, id, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.affectedRows)
        }
      })
      console.log(query.sql)
      connection.end()
    })
  }
}

module.exports = CarroDB
