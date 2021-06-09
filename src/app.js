const express = require('express')
const bodyParser = require('body-parser')
const { json } = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rotas
app.use('/api/carros', require('./routes/carros'))

// Rota Não Encontrada
app.use((req, res, next) => {
  res.status(404)
  res.json({ erro: 'Não encontrado' })
})

// Tratamento de Erro
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500)
  res.json({ erro: 'Erro na transação' })
})

// Server
const server = app.listen(3000, 'localhost', () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Servidor iniciado em http://${host}:${port}`)
})
